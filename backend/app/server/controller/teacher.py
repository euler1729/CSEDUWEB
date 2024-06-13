from server.database import db
from bson import ObjectId
from server.controller.user import retrieve_user
from server.models.teacher import TeacherUserSchema

teachers_collection = db["teachers"]

# helpers
def teacher_helper(teacher, user) -> dict:
    try:
        return {
            "id": str(teacher["_id"]),
            "user": {
                "id": teacher["user_id"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"],
                "address": user["address"],
                "contact": user["contact"],
                "city": user["city"],
                "state": user["state"],
                "role": user["role"],
            },
            "user_id": teacher["user_id"],
            "about": teacher["about"],
            "designation": teacher["designation"],
            "current_status": teacher["current_status"],
            "photo": teacher["photo"],
        }
    except KeyError as e:
        # Handle missing key error
        raise ValueError(f"Missing key in teacher or user data: {e}")
    except Exception as e:
        # Handle any other unexpected errors
        raise ValueError(f"An error occurred while processing teacher data: {e}")

# Add a new teacher into the database
async def add_teacher(teacher_data: dict):
    try:
        existing_teacher = teachers_collection.find_one({"user_id": teacher_data["user_id"]})
        if existing_teacher:
            raise ValueError("Teacher with this user ID already exists.")
        user = await retrieve_user(teacher_data["user_id"])
        teacher = teachers_collection.insert_one(teacher_data)
        new_teacher = teachers_collection.find_one({"_id": teacher.inserted_id})
        
        return teacher_helper(new_teacher, user)
    except Exception as e:
        raise ValueError(f"An error occurred while adding teacher data: {e}")


# Retrieve all teachers present in the database
async def retrieve_teachers():
    try:
        teachers = teachers_collection.find()
        teacher_list = []
        for teacher in teachers:
            user = await retrieve_user(teacher["user_id"])
            teacher_list.append(teacher_helper(teacher, user))
        return teacher_list
    except Exception as e:
        raise ValueError(f"An error occurred while retrieving teachers: {e}")

# Retrieve a teacher with a matching ID
async def retrieve_teacher(id: str):
    try:
        teacher = teachers_collection.find_one({"_id": ObjectId(id)})
        if teacher:
            user = await retrieve_user(teacher["user_id"])
            return teacher_helper(teacher, user)
        return None
    except Exception as e:
        raise ValueError(f"An error occurred while retrieving teacher with ID {id}: {e}")

# Update a teacher with a matching ID
async def update_teacher(id: str, data: dict):
    try:
        if len(data) < 1:
            return False
        teacher = teachers_collection.find_one({"_id": ObjectId(id)})
        if teacher:
            updated_teacher = teachers_collection.update_one(
                {"_id": ObjectId(id)}, {"$set": data}
            )
            if updated_teacher:
                user = await retrieve_user(teacher["user_id"])
                return teacher_helper(teacher, user)
        return False
    except Exception as e:
        raise ValueError(f"An error occurred while updating teacher with ID {id}: {e}")
    
async def delete_teacher(teacher_id: str):
    try:
        result = await teachers_collection.delete_one({"_id": ObjectId(teacher_id)})
        return result.deleted_count > 0
    except Exception as e:
        raise e

async def delete_all_teachers():
    try:
        result = await teachers_collection.delete_many({})
        return result.deleted_count > 0
    except Exception as e:
        raise e
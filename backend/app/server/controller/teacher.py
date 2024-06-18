from server.database import (
    teachers_collection, users_collection
)
from bson import ObjectId
from server.controller.user import retrieve_user
from server.models.teacher import TeacherUserSchema


# helpers
def teacher_helper(teacher, user) -> dict:
    return {
        "id": str(teacher["_id"]),
        "user": {
            "id": str(teacher["user_id"]),
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"],
            "address": user["address"],
            "contact": user["contact"],
            "city": user["city"],
            "state": user["state"],
            "role": user["role"],
        },
        "about": teacher["about"],
        "designation": teacher["designation"],
        "current_status": teacher["current_status"],
        "photo": teacher["photo"],
    }

# Function to add a new teacher with duplicacy check and error handling
async def add_teacher(teacher_data: dict):
    try:
        # Check for duplicacy based on a unique field (e.g., email or user_id)
        existing_teacher = teachers_collection.find_one({"user_id": teacher_data["user_id"]})
        if existing_teacher:
            return {"error": "Teacher with this user ID already exists."}
        
        # Check if the user exists
        user = users_collection.find_one({"_id": ObjectId(teacher_data["user_id"])})
        if not user:
            return {"error": "User with this ID does not exist."}

        # Insert the new teacher
        teacher = teachers_collection.insert_one(teacher_data)
        new_teacher = teachers_collection.find_one({"_id": teacher.inserted_id})
        return {"data": teacher_helper(new_teacher, user), "message": "Teacher added successfully."}
    except Exception as e:
        return {"error": str(e)}

# Retrieve all teachers present in the database
async def retrieve_teachers():
    teachers = teachers_collection.find()
    teacher_list = []
    for teacher in teachers:
        user = await retrieve_user(teacher["user_id"])
        teacher_list.append(teacher_helper(teacher, user))
    return teacher_list

# Retrieve a teacher with a matching ID
async def retrieve_teacher(id: str):
    teacher = teachers_collection.find_one({"_id": ObjectId(id)})
    if teacher:
        user = await retrieve_user(teacher["user_id"])
        return teacher_helper(teacher, user)
    return None

# Update a teacher with a matching ID
async def update_teacher(id: str, data: dict):
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

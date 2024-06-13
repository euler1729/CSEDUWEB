from server.database import db
from bson import ObjectId
from server.controller.user import retrieve_user
from server.models.teacher import TeacherUserSchema

staff_collection = db["staff"]

# helpers
def staff_helper(staff, user) -> dict:
    try:
        return {
            "id": str(staff["_id"]),
            "user": {
                "id": staff["user_id"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"],
                "address": user["address"],
                "contact": user["contact"],
                "city": user["city"],
                "state": user["state"],
                "role": user["role"],
            },
            "user_id": staff["user_id"],
            "about": staff["about"],
            "designation": staff["designation"],
            "current_status": staff["current_status"],
            "photo": staff["photo"],
            "joining_date": staff["joining_date"],
            "duty_time": staff["duty_time"],
            "works": staff["works"],
        }
    except KeyError as e:
        # Handle missing key error
        raise ValueError(f"Missing key in staff or user data: {e}")
    except Exception as e:
        # Handle any other unexpected errors
        raise ValueError(f"An error occurred while processing staff data: {e}")

# Add a new staff member into the database
async def add_staff(staff_data: dict):
    try:
        existing_staff = staff_collection.find_one({"user_id": staff_data["user_id"]})
        if existing_staff:
            raise ValueError("Staff with this user ID already exists.")
        
        staff = staff_collection.insert_one(staff_data)
        new_staff = staff_collection.find_one({"_id": staff.inserted_id})
        user = await retrieve_user(new_staff["user_id"])
        return staff_helper(new_staff, user)
    except ValueError as e:
        raise e
    except Exception as e:
        raise ValueError(f"An error occurred while adding staff data: {e}")

# Retrieve all staff members present in the database
async def retrieve_staff():
    try:
        staff_members = staff_collection.find()
        staff_list = []
        for staff in staff_members:
            user = await retrieve_user(staff["user_id"])
            staff_list.append(staff_helper(staff, user))
        return staff_list
    except Exception as e:
        raise ValueError(f"An error occurred while retrieving staff: {e}")

# Retrieve a staff member with a matching ID
async def retrieve_staff_member(id: str):
    try:
        staff = staff_collection.find_one({"_id": ObjectId(id)})
        if staff:
            user = await retrieve_user(staff["user_id"])
            return staff_helper(staff, user)
        return None
    except Exception as e:
        raise ValueError(f"An error occurred while retrieving staff with ID {id}: {e}")

# Update a staff member with a matching ID
async def update_staff(id: str, data: dict):
    try:
        if len(data) < 1:
            return False
        staff = staff_collection.find_one({"_id": ObjectId(id)})
        if staff:
            updated_staff = staff_collection.update_one(
                {"_id": ObjectId(id)}, {"$set": data}
            )
            if updated_staff:
                user = await retrieve_user(staff["user_id"])
                return staff_helper(staff, user)
        return False
    except Exception as e:
        raise ValueError(f"An error occurred while updating staff with ID {id}: {e}")

# Delete a staff member with a matching ID
async def delete_staff(id: str):
    try:
        staff = staff_collection.find_one({"_id": ObjectId(id)})
        if staff:
            staff_collection.delete_one({"_id": ObjectId(id)})
            return True
        return False
    except Exception as e:
        raise ValueError(f"An error occurred while deleting staff with ID {id}: {e}")

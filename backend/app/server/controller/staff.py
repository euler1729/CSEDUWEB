from server.database import (
    staff_collection, users_collection
)
from bson import ObjectId
from server.controller.user import retrieve_user
from server.models.staff import StaffUserSchema


# helpers
def staff_helper(staff, user) -> dict:
    return {
        "id": str(staff["_id"]),
        "user": {
            "id": str(staff["user_id"]),
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"],
            "address": user["address"],
            "contact": user["contact"],
            "city": user["city"],
            "state": user["state"],
            "role": user["role"],
        },
        "about": staff["about"],
        "designation": staff["designation"],
        "current_status": staff["current_status"],
        "photo": staff["photo"],
    }


async def add_staff(staff_data: dict):
    try:
        existing_staff = staff_collection.find_one({"user_id": staff_data["user_id"]})
        if existing_staff:
            return {"error": "staff with this user ID already exists."}
        
        # Check if the user exists
        user = users_collection.find_one({"_id": ObjectId(staff_data["user_id"])})
        if not user:
            return {"error": "User with this ID does not exist."}

        # Insert the new staff
        staff = staff_collection.insert_one(staff_data)
        new_staff = staff_collection.find_one({"_id": staff.inserted_id})
        return {"data": staff_helper(new_staff, user), "message": "staff added successfully."}
    except Exception as e:
        return {"error": str(e)}


async def retrieve_staffs():
    staffs = staff_collection.find()
    staff_list = []
    for staff in staffs:
        user = await retrieve_user(staff["user_id"])
        staff_list.append(staff_helper(staff, user))
    return staff_list

# Retrieve a staff with a matching ID
async def retrieve_staff(id: str):
    staff = staff_collection.find_one({"_id": ObjectId(id)})
    if staff:
        user = await retrieve_user(staff["user_id"])
        return staff_helper(staff, user)
    return None

# Update a staff with a matching ID
async def update_staff(id: str, data: dict):
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

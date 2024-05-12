from app.server.database import (
    db
)
from app.server.utils import (
    hash_password
)
from app.server.controller.auth import (
    verify_token
)
from bson import ObjectId
from fastapi import Request, Response, status

users_collection = db["users"]
news_collection=db["news"]
events_collection=db["events"]


# helpers
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": user["email"],
        "address": user["address"],
        "contact": user["contact"],
        "city": user["city"],
        "state": user["state"],
        "role": user["role"],
    }


# Add a new user into to the database
async def add_user(user_data: dict):
    password = hash_password(user_data["password"])
    print("Password is ", password)
    user_data["password"] = password
    user =  users_collection.insert_one(user_data)
    new_user =  users_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)

# Retrieve all users present in the database
async def retrieve_users():
    users = users_collection.find()
    user_list = []
    for user in users:
        user_list.append(user_helper(user))
    return user_list



# Retrieve a user with a matching ID
async def retrieve_user(id: str):
    user =  users_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)
    return None


# Update a user with a matching ID
async def update_user(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user =  users_collection.find_one({"_id": ObjectId(id)})
    if user:
        updated_user =  users_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_user:
            return True
        return False

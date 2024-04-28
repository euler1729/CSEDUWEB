from server.database import (
    db
)


users_collection = db["users"]


# helpers
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
    }
    
# Retrieve all users present in the database
async def retrieve_users():
    print("Hello I am Here")
    users = users_collection.find()
    print(users)
    return [user_helper(user) for user in users]

# Add a new user into to the database
async def add_user(user_data: dict):
    user =  users_collection.insert_one(user_data)
    new_user =  users_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)


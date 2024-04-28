from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.controller.user import (
    add_user,
    retrieve_users,
)
from server.models.user import (
    UserSchema,
    ResponseModel
)

router = APIRouter()

@router.post("/add", response_description="User data added into the database")
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully.")

@router.get("/all", response_description="Users retrieved")
async def get_users():
    print("All User is Called")
    users = await retrieve_users()
    if users:
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")


__all__ = ["router"]

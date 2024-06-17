from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder
from server.database import (
    db
)
from server.controller.user import (
    add_user,
    retrieve_users,
    retrieve_user,
    retrieve_user_by_email,
    update_user,
    delete_user
)
from server.models.user import (
    UserSchema,
    ResponseModel,
    ErrorResponseModel,
)

from server.middlewares.auth import (
    check_token
)
users_collection = db["users"]

router = APIRouter()


@router.post("/add", response_description="User data added into the database")
@check_token
async def add_user_data(request: Request, response: Response, user: UserSchema = Body(...)):
    try:
        existing_user = await retrieve_user_by_email(user.email)
        if existing_user:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return ErrorResponseModel(f"User with email {user.email} already exists!", 400, "User with this email already exists")
        user = jsonable_encoder(user)
        new_user = await add_user(user)
        return ResponseModel(new_user, "User added successfully.")
    except Exception as e:
        return ErrorResponseModel("An error occurred", 400, str(e))

@router.get("/all", response_description="Users retrieved")
@check_token
async def get_users(request: Request, response: Response):
    user = request.state.user
    if (user['role'] != 'admin'):
        response.status_code = 401
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    users = await retrieve_users()
    if users:
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")

@router.get("/{user_id}")
@check_token
async def get_user(request: Request, response: Response, user_id: str):
    try:
        if user_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", 401, "Unauthorized")
        new_user = await retrieve_user(user_id)
        if new_user:
            return ResponseModel(new_user, "User data retrieved successfully")
        new_user = await retrieve_user_by_email(user_id)
        if new_user:
            return ResponseModel(new_user, "User data retrieved successfully")
        return ResponseModel(new_user, "User not found")
    except Exception as e:
        return ErrorResponseModel("An error occurred", 400, str(e))

@router.put("/update/{user_id}")
@check_token
async def update_user_data(request: Request, response: Response, user_id: str, user: UserSchema = Body(...)):
    if user_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    user = {k: v for k, v in user.dict().items() if v is not None}
    updated_user = await update_user(user_id, user)
    if updated_user:
        return ResponseModel(
            "User with ID: {} name update is successful".format(user_id),
            "User name updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )

@router.delete("/delete/{user_id}", response_description="User data deleted from the database")
@check_token
async def delete_user_data(request: Request, response: Response, user_id: str):
    if user_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", 401, "Unauthorized")
    deleted_user = await delete_user(user_id)
    if deleted_user:
        return ResponseModel(
            "User with ID: {} removed".format(user_id), "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "User with id {0} doesn't exist".format(user_id)
    )

__all__ = ["router"]


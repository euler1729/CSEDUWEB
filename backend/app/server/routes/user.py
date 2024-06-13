from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

<<<<<<< HEAD
from server.controller.user import (
    add_user,
    retrieve_users,
    retrieve_user,
    update_user
)
from server.models.user import (
    UserSchema,
    ResponseModel,
    ErrorResponseModel,
)

from server.middlewares.auth import (
=======
from app.server.controller.user import (
    add_user,
    retrieve_users,
    retrieve_user,
    update_user,

)
from app.server.models.user import (
    UserSchema,
    ResponseModel,
    ErrorResponseModel,

)

from app.server.middlewares.auth import (
>>>>>>> events-and-news
    check_token
)

router = APIRouter()


@router.post("/add", response_description="User data added into the database")
@check_token
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully.")

<<<<<<< HEAD
=======

>>>>>>> events-and-news
@router.get("/all", response_description="Users retrieved")
@check_token
async def get_users(request: Request, response: Response):
    user = request.state.user
<<<<<<< HEAD
    if(user['role'] != 'admin'):
=======
    if (user['role'] != 'admin'):
>>>>>>> events-and-news
        response.status_code = 401
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    users = await retrieve_users()
    if users:
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")

<<<<<<< HEAD
=======

>>>>>>> events-and-news
@router.get("/{user_id}")
@check_token
async def get_user(request: Request, response: Response, user_id: str):
    if user_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
<<<<<<< HEAD

=======
>>>>>>> events-and-news
    user = await retrieve_user(user_id)
    if user:
        return ResponseModel(user, "User data retrieved successfully")
    return ResponseModel(user, "User not found")

<<<<<<< HEAD
=======

>>>>>>> events-and-news
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

__all__ = ["router"]


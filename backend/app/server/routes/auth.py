from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder


from server.controller.user import (
    retrieve_user
)

from server.models.user import (
    ResponseModel,
    ErrorResponseModel,
)

from server.models.auth import (
    Token,
    DataToken,
    UserLogin,
)

from server.controller.auth import (
    authenticate_user,
    create_access_token,
    verify_token,
)

router = APIRouter()

@router.post('/login', response_description="access token generated")
async def login_user(user: UserLogin = Body(...)):
    login_info = await authenticate_user(user.email, user.password)
    if login_info:
        return Token(access_token=login_info['access_token'], token_type="bearer", id=str(login_info["_id"]))
    return ErrorResponseModel("An error occurred", 404, "Invalid credentials")


__all__ = ["router"]
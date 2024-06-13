from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder


from app.server.controller.user import (
    retrieve_user
)

from app.server.models.user import (
    ResponseModel,
    ErrorResponseModel,
)

from app.server.models.auth import (
    Token,
    DataToken,
    UserLogin,
)

from app.server.controller.auth import (
    authenticate_user,
    create_access_token,
    verify_token,
)

router = APIRouter()

@router.post('/login', response_description="access token generated")
async def login_user(user: UserLogin = Body(...)):
    access_token = await authenticate_user(user.email, user.password)
    if access_token:
        return Token(access_token=access_token, token_type="bearer")
    return ErrorResponseModel("An error occurred", 404, "Invalid credentials")


__all__ = ["router"]
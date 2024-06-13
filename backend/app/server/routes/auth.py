from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder


<<<<<<< HEAD
from server.controller.user import (
    retrieve_user
)

from server.models.user import (
=======
from app.server.controller.user import (
    retrieve_user
)

from app.server.models.user import (
>>>>>>> events-and-news
    ResponseModel,
    ErrorResponseModel,
)

<<<<<<< HEAD
from server.models.auth import (
=======
from app.server.models.auth import (
>>>>>>> events-and-news
    Token,
    DataToken,
    UserLogin,
)

<<<<<<< HEAD
from server.controller.auth import (
=======
from app.server.controller.auth import (
>>>>>>> events-and-news
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
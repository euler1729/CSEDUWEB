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
    ResetInit,
    ResetPassword,
)

from server.controller.auth import (
    authenticate_user,
    create_access_token,
    verify_token,
    reset_password_send_email,
    reset_password_change_password,
)

router = APIRouter()

@router.post('/login', response_description="access token generated")
async def login_user(user: UserLogin = Body(...)):
    login_info = await authenticate_user(user.email, user.password)
    if login_info:
        return Token(access_token=login_info['access_token'], token_type="bearer", id=str(login_info["_id"]))
    return ErrorResponseModel("An error occurred", 404, "Invalid credentials")

# Reset Password Init
@router.post('/reset-password-init', response_description="reset password init")
async def reset_password_init(info: ResetInit = Body(...)):
    try:
        success = await reset_password_send_email(info.email)
        if success:
            return ResponseModel("Check your email for OTP to reset password!", "Reset password email sent successfully")
        return ErrorResponseModel("An error occurred", 404, "Invalid credentials")
    except Exception as e:
        print(e)
        return ErrorResponseModel("An error occurred", 404, str(e))

# Reset Password Confirm
@router.post('/reset-password-confirm', response_description="reset password confirm")
async def reset_password_confirm(reset_info: ResetPassword = Body(...)):
    try:
        success = await reset_password_change_password(reset_info.email, reset_info.otp, reset_info.password)
        if success:
            return ResponseModel("Password reset successful", "Password reset successful")
        return ErrorResponseModel("An error occurred", 404, "Invalid credentials")
    except Exception as e:
        print(e)
        return ErrorResponseModel("An error occurred", 404, str(e))


__all__ = ["router"]
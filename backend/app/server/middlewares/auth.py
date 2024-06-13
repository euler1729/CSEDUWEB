from functools import wraps
from fastapi import Request, Response, status
from app.server.controller.auth import (
    verify_token,
)


def check_token(func):
    @wraps(func)
    async def wrapper(request: Request, response: Response, *args, **kwargs):
        try:
            token = request.headers['authorization'].split('Bearer ')[1]
            user = verify_token(token)
            if user:
                print("Authorized")
                request.state.user = user
                return await func(request, response, *args, **kwargs)
            else:
                print("Unauthorized")
                response.status_code = status.HTTP_401_UNAUTHORIZED
                return {"message": "Unauthorized"}
        except Exception as e:
            response.status_code = 401
            return {"message": "Unauthorized"}
        
    return wrapper
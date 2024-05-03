from functools import wraps
from fastapi import Request, Response

def check_token(func):
    @wraps(func)
    async def wrapper(request: Request, response: Response, *args, **kwargs):
        print(request.headers)
        if "token" not in request.cookies:
            response.status_code = 401
            return {"message": "Unauthorized"}
        return await func(request, response, *args, **kwargs)
    return wrapper
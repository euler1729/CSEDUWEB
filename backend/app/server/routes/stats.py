from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.middlewares.auth import (
    check_token
)

from server.controller.stats import (
    get_stats
)
from server.models.user import (
    ErrorResponseModel
)


router = APIRouter()

@router.get("/all", response_description="Stats viewed")
@check_token
async def stats_all(request: Request, response: Response,):
    try:
        user = request.state.user
        if (user['role'] != 'admin'):
            response.status_code = 401
            return ErrorResponseModel("Unauthorized", 401, "Unauthorized")
        return await get_stats()
    except Exception as e:
        print(e)
        return ErrorResponseModel("An error occurred", 400, str(e))
        
__all__ = ["router"]
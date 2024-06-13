from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.alumni import (
    add_alumni,
    retrieve_alumni,
    retrieve_alumni_by_id,
    update_alumni
)
from server.models.alumni import (
    AlumniSchema,
    UpdateAlumniSchema
)
from server.models.user import (
    ResponseModel,
    ErrorResponseModel,
)

from server.middlewares.auth import (
    check_token
)

router = APIRouter()

@router.post("/add", response_description="Alumni data added into the database")
@check_token
async def add_alumni_data(alumni: AlumniSchema = Body(...)):
    alumni = jsonable_encoder(alumni)
    new_alumni = await add_alumni(alumni)
    return ResponseModel(new_alumni, "Alumni added successfully.")

@router.get("/all", response_description="Alumni retrieved")
@check_token
async def get_alumni(request: Request, response: Response):
    user = request.state.user
    if user['role'] != 'admin':
        response.status_code = 401
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    alumni = await retrieve_alumni()
    if alumni:
        return ResponseModel(alumni, "Alumni data retrieved successfully")
    return ResponseModel(alumni, "Empty list returned")

@router.get("/{alumni_id}")
@check_token
async def get_alumni_id(request: Request, response: Response, alumni_id: str):
    if alumni_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    alumni = await retrieve_alumni_by_id(alumni_id)
    if alumni:
        return ResponseModel(alumni, "Alumni data retrieved successfully")
    return ResponseModel(alumni, "Alumni not found")

@router.put("/update/{alumni_id}")
@check_token
async def update_alumni_data(request: Request, response: Response, alumni_id: str, alumni: UpdateAlumniSchema = Body(...)):
    if alumni_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    alumni = {k: v for k, v in alumni.dict().items() if v is not None}
    updated_alumni = await update_alumni(alumni_id, alumni)
    if updated_alumni:
        return ResponseModel(
            "Alumni with ID: {} update is successful".format(alumni_id),
            "Alumni updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )

__all__ = ["router"]

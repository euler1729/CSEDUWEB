from fastapi import APIRouter, Body, Request, Response, status, HTTPException
from fastapi.encoders import jsonable_encoder

from server.controller.alumni import (
    add_alumni,
    retrieve_alumni,
    retrieve_alumni_by_id,
    update_alumni,
    delete_alumni,
    delete_all_alumni
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
async def add_alumni_data(request: Request, response: Response, alumni: AlumniSchema = Body(...)):
    try:
        alumni = jsonable_encoder(alumni)
        new_alumni = await add_alumni(alumni)
        return ResponseModel(new_alumni, "Alumni added successfully.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all", response_description="Alumni retrieved")
@check_token
async def get_alumni(request: Request, response: Response):
    try:
        user = request.state.user
        if user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        alumni = await retrieve_alumni()
        if alumni:
            return ResponseModel(alumni, "Alumni data retrieved successfully")
        return ResponseModel(alumni, "Empty list returned")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{alumni_id}")
@check_token
async def get_alumni_id(request: Request, response: Response, alumni_id: str):
    try:
        if alumni_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        alumni = await retrieve_alumni_by_id(alumni_id)
        if alumni:
            return ResponseModel(alumni, "Alumni data retrieved successfully")
        return ResponseModel(alumni, "Alumni not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/update/{alumni_id}")
@check_token
async def update_alumni_data(request: Request, response: Response, alumni_id: str, alumni: UpdateAlumniSchema = Body(...)):
    try:
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
            status="400",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete/{alumni_id}", response_description="Alumni data deleted from the database")
@check_token
async def delete_alumni_data(request: Request, response: Response, alumni_id: str):
    try:
        if alumni_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        deleted_alumni = await delete_alumni(alumni_id)
        if deleted_alumni:
            return ResponseModel(
                "Alumni with ID: {} deleted successfully".format(alumni_id),
                "Alumni deleted successfully",
            )
        return ResponseModel(
            "An error occurred",
            status="400",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete/all", response_description="All alumni data deleted from the database")
@check_token
async def delete_all_alumni_data(request: Request, response: Response):
    try:
        user = request.state.user
        if user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        deleted_alumni = await delete_all_alumni()
        if deleted_alumni:
            return ResponseModel(
                "All alumni deleted successfully",
                "All alumni data deleted successfully",
            )
        return ResponseModel(
            "An error occurred",
            status="400",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

__all__ = ["router"]

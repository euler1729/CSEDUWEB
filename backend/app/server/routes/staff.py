from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder
from server.database import db
from bson import ObjectId
from server.controller.staff import (
    add_staff,
    retrieve_staffs,
    retrieve_staff,
    update_staff
)
from server.models.staff import (
    StaffUserSchema,
    UpdateStaffUserSchema
)
from server.models.user import (
    ResponseModel,
    ErrorResponseModel,
)

from server.middlewares.auth import (
    check_token
)

router = APIRouter()

@router.post("/add", response_description="staff data added into the database")
@check_token
async def add_staff_data(request: Request, response: Response, staff: StaffUserSchema = Body(...)):
    staff = jsonable_encoder(staff)
    new_staff = await add_staff(staff)
    if "error" in new_staff:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return ErrorResponseModel("An error occurred", new_staff["error"], "staff Not Created.")
    return ResponseModel(new_staff, "staff added successfully.")

@router.get("/all", response_description="staffs retrieved")
# @check_token
async def get_staffs(request: Request, response: Response):
    # user = request.state.user
    # if user['role'] != 'admin':
    #     response.status_code = 401
    #     return ErrorResponseModel("Unauthorized", "Unauthorized")
    staffs = await retrieve_staffs()
    if staffs:
        return ResponseModel(staffs, "staffs data retrieved successfully")
    return ResponseModel(staffs, "Empty list returned")

@router.get("/{staff_id}")
# @check_token
async def get_staff(request: Request, response: Response, staff_id: str):
    # if staff_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
    #     response.status_code = status.HTTP_401_UNAUTHORIZED
    #     return ErrorResponseModel("Unauthorized", "Unauthorized")
    staff = await retrieve_staff(staff_id)
    if staff:
        return ResponseModel(staff, "staff data retrieved successfully")
    return ResponseModel(staff, "staff not found")

@router.put("/update/{staff_id}")
@check_token
async def update_staff_data(request: Request, response: Response, staff_id: str, staff: UpdateStaffUserSchema = Body(...)):
    if staff_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    staff = {k: v for k, v in staff.dict().items() if v is not None}
    updated_staff = await update_staff(staff_id, staff)
    if updated_staff:
        return ResponseModel(
            "staff with ID: {} name update is successful".format(staff_id),
            "staff name updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )
@router.delete("/delete/{staff_id}", response_description="Delete a staff")
@check_token
async def delete_one_staff(request: Request, response: Response, staff_id: str):
    if staff_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    
    staff = db["staffs"].find_one({"_id": ObjectId(staff_id)})
    if not staff:
        return ResponseModel(
            "An error occurred",
            "staff with ID: {} not found".format(staff_id),
        )
    
    delete_result = db["staffs"].delete_one({"_id": ObjectId(staff_id)})
    return ResponseModel(
        "staff with ID: {} deleted successfully".format(staff_id),
        "staff deleted successfully",
    )

@router.delete("/delete-all", response_description="Delete all staffs with the same staff_id")
@check_token
async def delete_all_staffs(request: Request, response: Response):
    user = request.state.user
    if user['role'] != 'admin':
        response.status_code = 401
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    
    delete_result = db["staffs"].delete_many({})
    return ResponseModel(
        "An error occurred",
        "",
    )
__all__ = ["router"]

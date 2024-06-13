from fastapi import APIRouter,Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.staff import (
    add_staff,
    retrieve_all_staffs,
    retrieve_one_staff,
    update_staff,
)

from server.models.staff import (
    StaffScheme,
    UpdateStaffModel,
    ResponseModel,
    ErrorResponseModel,
)

from server.middlewares.auth  import(
    check_token
)

router = APIRouter()

@router.post("/add",response_description="Staff data added successfully")
async def add_staff_data(staff:StaffScheme=Body(...)):
    staff =jsonable_encoder(staff)
    new_staff=await add_staff(staff)
    return ResponseModel(new_staff,"Staff added successfully")

@router.get("/all",response_description="Staffs retrieved")
async def get_staffs(request: Request, response: Response):
   
    staffs=await retrieve_all_staffs()
    if staffs:
        return ResponseModel(staffs,"Staffs data successfully retrieved")
    
    return ResponseModel(staffs,"Empty list returned")

@router.get("/{staff_id}")
async def get_staff(request: Request, response: Response, staff_id: str):
    staff=await retrieve_one_staff(id=staff_id)
    if staff:
        return ResponseModel(staff,"Staff data retrieved successfully")
    return ResponseModel(staff,"staff not found")


@router.put("/update/{staff_id}")
@check_token
async def update_user_data(request: Request, response: Response, staff_id: str, staff: StaffScheme = Body(...)):
    
    staff = {k: v for k, v in staff.dict().items() if v is not None}

    updated_staff = await update_staff(id=staff_id,data= staff)
    if updated_staff:
        return ResponseModel(
            "Staff with ID: {} update is successful".format(staff_id),
            "Staff updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )

__all__ = ["router"]
from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.teacher import (
    add_teacher,
    retrieve_teachers,
    retrieve_teacher,
    update_teacher
)
from server.models.teacher import (
    TeacherUserSchema,
    UpdateTeacherUserSchema
)
from server.models.user import (
    ResponseModel,
    ErrorResponseModel,
)

from server.middlewares.auth import (
    check_token
)

router = APIRouter()

@router.post("/add", response_description="Teacher data added into the database")
@check_token
async def add_teacher_data(request: Request, response: Response,teacher: TeacherUserSchema = Body(...)):
    print(teacher)
    teacher = jsonable_encoder(teacher)
    new_teacher = await add_teacher(teacher)
    return ResponseModel(new_teacher, "Teacher added successfully.")

@router.get("/all", response_description="Teachers retrieved")
@check_token
async def get_teachers(request: Request, response: Response):
    user = request.state.user
    if user['role'] != 'admin':
        response.status_code = 401
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    teachers = await retrieve_teachers()
    if teachers:
        return ResponseModel(teachers, "Teachers data retrieved successfully")
    return ResponseModel(teachers, "Empty list returned")

@router.get("/{teacher_id}")
@check_token
async def get_teacher(request: Request, response: Response, teacher_id: str):
    if teacher_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    teacher = await retrieve_teacher(teacher_id)
    if teacher:
        return ResponseModel(teacher, "Teacher data retrieved successfully")
    return ResponseModel(teacher, "Teacher not found")

@router.put("/update/{teacher_id}")
@check_token
async def update_teacher_data(request: Request, response: Response, teacher_id: str, teacher: UpdateTeacherUserSchema = Body(...)):
    if teacher_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    teacher = {k: v for k, v in teacher.dict().items() if v is not None}
    updated_teacher = await update_teacher(teacher_id, teacher)
    if updated_teacher:
        return ResponseModel(
            "Teacher with ID: {} update is successful".format(teacher_id),
            "Teacher name updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )

__all__ = ["router"]

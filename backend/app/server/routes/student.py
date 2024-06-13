from fastapi import APIRouter, Body, Request, Response, status, HTTPException
from fastapi.encoders import jsonable_encoder

from server.controller.student import (
    add_student,
    retrieve_students,
    retrieve_student,
    update_student,
    delete_student,
    delete_all_students
)
from server.models.student import (
    StudentSchema,
    UpdateStudentSchema
)
from server.models.user import (
    ResponseModel,
    ErrorResponseModel,
)

from server.middlewares.auth import (
    check_token
)

router = APIRouter()

@router.post("/add", response_description="Student data added into the database")
@check_token
async def add_student_data(request: Request, response: Response, student: StudentSchema = Body(...)):
    try:
        student = jsonable_encoder(student)
        new_student = await add_student(student)
        return ResponseModel(new_student, "Student added successfully.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all", response_description="Students retrieved")
@check_token
async def get_students(request: Request, response: Response):
    try:
        user = request.state.user
        if user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        students = await retrieve_students()
        if students:
            return ResponseModel(students, "Students data retrieved successfully")
        return ResponseModel(students, "Empty list returned")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{student_id}")
@check_token
async def get_student(request: Request, response: Response, student_id: str):
    try:
        if student_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        student = await retrieve_student(student_id)
        if student:
            return ResponseModel(student, "Student data retrieved successfully")
        return ResponseModel(student, "Student not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/update/{student_id}")
@check_token
async def update_student_data(request: Request, response: Response, student_id: str, student: UpdateStudentSchema = Body(...)):
    try:
        if student_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        student = {k: v for k, v in student.dict().items() if v is not None}
        updated_student = await update_student(student_id, student)
        if updated_student:
            return ResponseModel(
                "Student with ID: {} update is successful".format(student_id),
                "Student name updated successfully",
            )
        return ResponseModel(
            "An error occurred",
            status="400",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete/{student_id}", response_description="Student data deleted from the database")
@check_token
async def delete_student_data(request: Request, response: Response, student_id: str):
    try:
        if student_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        deleted_student = await delete_student(student_id)
        if deleted_student:
            return ResponseModel(
                "Student with ID: {} deleted successfully".format(student_id),
                "Student deleted successfully",
            )
        return ResponseModel(
            "An error occurred",
            status="400",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete/all", response_description="All student data deleted from the database")
@check_token
async def delete_all_students_data(request: Request, response: Response):
    try:
        user = request.state.user
        if user['role'] != 'admin':
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return ErrorResponseModel("Unauthorized", "Unauthorized")
        deleted_students = await delete_all_students()
        if deleted_students:
            return ResponseModel(
                "All students deleted successfully",
                "All student data deleted successfully",
            )
        return ResponseModel(
            "An error occurred",
            status="400",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

__all__ = ["router"]

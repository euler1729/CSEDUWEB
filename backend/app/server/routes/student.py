from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder
from server.database import db
from bson import ObjectId

from server.controller.student import (
    add_student,
    retrieve_students,
    retrieve_student,
    update_student
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
async def add_student_data(request: Request, response: Response,student: StudentSchema = Body(...)):
    student = jsonable_encoder(student)
    new_student = await add_student(student)
    if "error" in new_student:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return ErrorResponseModel("An error occurred", new_student["error"], "Student Not Created.")
    return ResponseModel(new_student, "Student added successfully.")

@router.get("/all", response_description="Students retrieved")
# @check_token
async def get_students(request: Request, response: Response):
    # user = request.state.user
    # if user['role'] != 'admin':
    #     response.status_code = 401
    #     return ErrorResponseModel("Unauthorized", "Unauthorized")
    students = await retrieve_students()
    if students:
        return ResponseModel(students, "Students data retrieved successfully")
    return ResponseModel(students, "Empty list returned")

@router.get("/{student_id}")
# @check_token
async def get_student(request: Request, response: Response, student_id: str):
    # if student_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
    #     response.status_code = status.HTTP_401_UNAUTHORIZED
    #     return ErrorResponseModel("Unauthorized", "Unauthorized")
    student = await retrieve_student(student_id)
    if student:
        return ResponseModel(student, "Student data retrieved successfully")
    return ResponseModel(student, "Student not found")

@router.put("/update/{student_id}")
@check_token
async def update_student_data(request: Request, response: Response, student_id: str, student: UpdateStudentSchema = Body(...)):
    if student_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    student = {k: v for k, v in student.dict().items() if v is not None}
    updated_student = await update_student(student_id, student)
    if updated_student:
        return ResponseModel(
            "Student with ID: {} name update is successful".format(student_id),
            "Student name updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )

@router.delete("/delete/{student_id}", response_description="Delete a student")
@check_token
async def delete_one_student(request: Request, response: Response, student_id: str):
    if student_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    
    student = db["students"].find_one({"_id": ObjectId(student_id)})
    if not student:
        return ResponseModel(
            "An error occurred",
            "Student with ID: {} not found".format(student_id),
        )
    
    delete_result = db["students"].delete_one({"_id": ObjectId(student_id)})
    if delete_result.deleted_count == 1:
        db["alumni"].delete_many({"student_id": student_id})
        return ResponseModel(
            "Student with ID: {} and corresponding alumni deleted successfully".format(student_id),
            "Student and corresponding alumni deleted successfully",
        )
    return ResponseModel(
        "An error occurred",
        "Student with ID: {} not found".format(student_id),
    )

@router.delete("/delete-all", response_description="Delete all students with the same student_id")
@check_token
async def delete_all_students(request: Request, response: Response):
    user = request.state.user
    if user['role'] != 'admin':
        response.status_code = 401
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    
    delete_result = db["students"].delete_many({})
    if delete_result.deleted_count > 0:
        alumni_delete_result = db["alumni"].delete_many({})
        return ResponseModel(
            "{} students and {} corresponding alumni deleted successfully".format(delete_result.deleted_count, alumni_delete_result.deleted_count),
            "All students and corresponding alumni with the same student_id deleted successfully",
        )
    return ResponseModel(
        "An error occurred",
        "No students found ",
    )
__all__ = ["router"]

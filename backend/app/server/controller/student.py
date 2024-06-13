from server.database import db
from bson import ObjectId
from server.controller.user import retrieve_user
from server.models.student import StudentSchema, UpdateStudentSchema

students_collection = db["students"]

# helpers
def student_helper(student, user) -> dict:
    return {
        "id": str(student["_id"]),
        "user": {
            "id": str(user["_id"]),
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"],
            "address": user["address"],
            "contact": user["contact"],
            "city": user["city"],
            "state": user["state"],
            "role": user["role"],
        },
        "student_id": student["student_id"],
        "enrollment_year": student["enrollment_year"],
        "graduation_year": student.get("graduation_year"),
        "major": student["major"],
        "minor": student.get("minor"),
        "courses": student["courses"],
        "gpa": student.get("gpa"),
        "advisor": student.get("advisor"),
    }

# Add a new student into the database
async def add_student(student_data: dict):
    student = students_collection.insert_one(student_data)
    new_student = students_collection.find_one({"_id": student.inserted_id})
    user = await retrieve_user(new_student["user_id"])
    return student_helper(new_student, user)

# Retrieve all students present in the database
async def retrieve_students():
    students = students_collection.find()
    student_list = []
    for student in students:
        user = await retrieve_user(student["user_id"])
        student_list.append(student_helper(student, user))
    return student_list

# Retrieve a student with a matching ID
async def retrieve_student(id: str):
    student = students_collection.find_one({"_id": ObjectId(id)})
    if student:
        user = await retrieve_user(student["user_id"])
        return student_helper(student, user)
    return None

# Update a student with a matching ID
async def update_student(id: str, data: dict):
    if len(data) < 1:
        return False
    student = students_collection.find_one({"_id": ObjectId(id)})
    if student:
        updated_student = students_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_student:
            user = await retrieve_user(student["user_id"])
            return student_helper(student, user)
    return False

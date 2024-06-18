from server.database import (
    alumni_collection
)
from bson import ObjectId
from server.controller.student import retrieve_student
from server.models.alumni import AlumniSchema

# helpers
def alumni_helper(alumni, student) -> dict:
    return {
        "id": str(alumni["_id"]),
        "student": student,
        "industry": alumni["industry"],
        "current_position": alumni["current_position"],
        "company": alumni["company"],
        "experience": alumni.get("experience"),
        "linkedin": alumni.get("linkedin"),
        "achievements": alumni.get("achievements"),
        "skills": alumni.get("skills"),
    }

# Add a new alumni into the database
async def add_alumni(alumni_data: dict):
    try:
        # Check if the student ID already exists in the alumni collection
        if alumni_collection.find_one({"student_id": alumni_data["student_id"]}):
            return {"error": "Alumni with this student ID already exists."}

        # Retrieve the student information
        student = await retrieve_student(alumni_data["student_id"])
        if not student:
            return {"error": "Student not found."}

        # Insert the new alumni data
        alumni = alumni_collection.insert_one(alumni_data)
        new_alumni = alumni_collection.find_one({"_id": alumni.inserted_id})

        return alumni_helper(new_alumni, student)

    except Exception as e:
        return {"error": str(e)}

# Retrieve all alumni present in the database
async def retrieve_alumni():
    alumni = alumni_collection.find()
    alumni_list = []
    for alum in alumni:
        student = await retrieve_student(alum["student_id"])
        alumni_list.append(alumni_helper(alum, student))
    return alumni_list

# Retrieve an alumni with a matching ID
async def retrieve_alumni_by_id(id: str):
    alumni = alumni_collection.find_one({"_id": ObjectId(id)})
    if alumni:
        student = await retrieve_student(alumni["student_id"])
        return alumni_helper(alumni, student)
    return None

# Update an alumni with a matching ID
async def update_alumni(id: str, data: dict):
    if len(data) < 1:
        return False
    alumni = alumni_collection.find_one({"_id": ObjectId(id)})
    if alumni:
        updated_alumni = alumni_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_alumni:
            student = await retrieve_student(alumni["student_id"])
            return alumni_helper(alumni, student)
    return False

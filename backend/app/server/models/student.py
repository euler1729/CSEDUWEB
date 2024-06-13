from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

class StudentSchema(BaseModel):
    user_id: str = Field(..., description="The ID of the user associated with this student")
    student_id: str = Field(..., description="Unique identifier for the student")
    enrollment_year: int = Field(..., description="Year the student enrolled")
    graduation_year: Optional[int] = Field(None, description="Year the student graduated or expected to graduate")
    major: str = Field(..., description="Major field of study")
    minor: Optional[str] = Field(None, description="Minor field of study")
    courses: List[str] = Field(..., description="List of courses the student is enrolled in")
    gpa: Optional[float] = Field(None, description="Current GPA of the student")
    advisor: Optional[str] = Field(None, description="Advisor assigned to the student")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "60d5f4f8f8d2c2f8f8d2c2f8",
                "student_id": "S123456",
                "enrollment_year": 2022,
                "graduation_year": 2026,
                "major": "Computer Science",
                "minor": "Mathematics",
                "courses": ["CS101", "MATH203", "PHYS101"],
                "gpa": 3.8,
                "advisor": "Dr. John Smith"
            }
        }

class UpdateStudentSchema(BaseModel):
    user_id: Optional[str]
    student_id: Optional[str]
    enrollment_year: Optional[int]
    graduation_year: Optional[int]
    major: Optional[str]
    minor: Optional[str]
    courses: Optional[List[str]]
    gpa: Optional[float]
    advisor: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "60d5f4f8f8d2c2f8f8d2c2f8",
                "student_id": "S123456",
                "enrollment_year": 2022,
                "graduation_year": 2026,
                "major": "Computer Science",
                "minor": "Mathematics",
                "courses": ["CS101", "MATH203", "PHYS101"],
                "gpa": 3.8,
                "advisor": "Dr. John Smith"
            }
        }

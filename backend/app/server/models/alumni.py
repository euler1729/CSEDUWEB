from typing import Optional, List
from pydantic import BaseModel, Field
from server.models.student import StudentSchema

class AlumniSchema(BaseModel):
    student_id: str = Field(..., description="The ID of the student associated with this alumni")
    industry: str = Field(..., description="Industry in which the alumni is working")
    current_position: str = Field(..., description="Current job title or position of the alumni")
    company: str = Field(..., description="Company where the alumni is currently employed")
    experience: Optional[int] = Field(None, description="Years of experience in the industry")
    linkedin: Optional[str] = Field(None, description="LinkedIn profile URL")
    achievements: Optional[List[str]] = Field(None, description="List of notable achievements")
    skills: Optional[List[str]] = Field(None, description="List of professional skills")

    class Config:
        json_schema_extra = {
            "example": {
                "student_id": "60d5f4f8f8d2c2f8f8d2c2f8",
                "industry": "Information Technology",
                "current_position": "Senior Software Engineer",
                "company": "Tech Corp",
                "experience": 10,
                "linkedin": "https://www.linkedin.com/in/alicejohnson",
                "achievements": ["Developed a scalable application used by millions", "Recipient of the Tech Innovator Award"],
                "skills": ["Python", "Machine Learning", "Cloud Computing"]
            }
        }

class UpdateAlumniSchema(BaseModel):
    student_id: Optional[str]
    industry: Optional[str]
    current_position: Optional[str]
    company: Optional[str]
    experience: Optional[int]
    linkedin: Optional[str]
    achievements: Optional[List[str]]
    skills: Optional[List[str]]

    class Config:
        json_schema_extra = {
            "example": {
                "student_id": "60d5f4f8f8d2c2f8f8d2c2f8",
                "industry": "Information Technology",
                "current_position": "Senior Software Engineer",
                "company": "Tech Corp",
                "experience": 10,
                "linkedin": "https://www.linkedin.com/in/alicejohnson",
                "achievements": ["Developed a scalable application used by millions", "Recipient of the Tech Innovator Award"],
                "skills": ["Python", "Machine Learning", "Cloud Computing"]
            }
        }

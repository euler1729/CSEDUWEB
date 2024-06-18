from typing import Optional
from pydantic import BaseModel, Field

class StaffUserSchema(BaseModel):
    user_id: str = Field(..., description="The ID of the user associated with this teacher")
    about: str = Field(..., description="A brief description about the teacher")
    designation: str = Field(..., description="The designation of the teacher")
    current_status: str = Field(..., description="Current status of the teacher (study leave/working/left the dept)")
    photo: str = Field(..., description="URL of the teacher's photo")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "60d5f4f8f8d2c2f8f8d2c2f8",
                "about": "John Doe is an cashier in Computer Science.",
                "designation": "Assitant Manager",
                "current_status": "working",
                "photo": "photo_url"
            }
        }

class UpdateStaffUserSchema(BaseModel):
    user_id: Optional[str]
    about: Optional[str]
    designation: Optional[str]
    current_status: Optional[str]
    photo: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "60d5f4f8f8d2c2f8f8d2c2f8",
                "about": "John Doe is an cashier in Computer Science.",
                "designation": "Assitant Manager",
                "current_status": "working",
                "photo": "photo_url"
            }
        }

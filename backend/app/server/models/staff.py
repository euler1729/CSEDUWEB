from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class StaffScheme(BaseModel):
    first_name: str = Field(...)
    last_name: str = Field(...)
    email: EmailStr = Field(...)
    address: str = Field(...)
    contact: str = Field(...)
    city: str = Field(...)
    role: str = Field(...)
    photo: str = Field(...)

    class Config:
        json_scheme_extra={
            "example": {
                "first_name": "Aminul",
                "last_name": "Islam",
                "email": "aminul_islam@gmail.com",
                "address": "Dhaka",
                "contact": "017123456",
                "role": "Technichal Operator",
                "photo": "photo"
            }
        }

class UpdateStaffModel(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[EmailStr]
    address: Optional[str]
    contact: Optional[str]
    city: Optional[str]
    role: Optional[str]
    photo: Optional[str]

    class Config:
        json_scheme_extra={
            "example": {
                "first_name": "Aminul",
                "last_name": "Islam",
                "email": "aminul_islam@gmail.com",
                "address": "Dhaka",
                "contact": "017123456",
                "role": "Technichal Operator",
                "photo": "photo"
            }
        }


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
        
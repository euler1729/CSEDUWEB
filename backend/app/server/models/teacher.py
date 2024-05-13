from typing import Optional
from pydantic import BaseModel, EmailStr, Field

from user import UserSchema

class TeacherBaseModel(BaseModel):
    user:UserSchema
    department:str=Field(...)
    designation:str=Field(...)
    class Config:
        json_schema_extra = {
            "example": {
                "first_name": "Mahmudul",
                "last_name": "Hasan",
                "email": "test@gmail.com",
                "address": "Dhaka",
                "contact": "017123456",
                "city": "Dhaka",
                "state": "Dhaka",
                "password": "password",
                "role": "admin",
                "department":"CSE",
                "designation":"Professor"
            }   
        }
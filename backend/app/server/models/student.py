from typing import Optional
from pydantic import BaseModel, EmailStr, Field

from user import UserSchema

class StudentBaseModel(BaseModel):
    user:UserSchema
    department:str=Field(...)
    session:str=Field(...)
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
                "session":"2019-2020"
            }   
        }
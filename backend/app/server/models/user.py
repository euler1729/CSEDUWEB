from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    
    first_name: str = Field(...)
    last_name: str = Field(...)
    email: EmailStr = Field(...)
    address: str = Field(...)
    contact: str = Field(...)
    city: str = Field(...)
    state: str = Field(...)
    password: str = Field(...)
    role: str = Field(...)
    
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
                "role": "admin"
            }
        }


class UpdateUserModel(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[EmailStr]
    address: Optional[str]
    contact: Optional[str]
    city: Optional[str]
    state: Optional[str]
    password: Optional[str]
    role: Optional[str]
    
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
                "role": "admin"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)
    
    class Config:
        schema_extra = {
            "example": {
                "email": "jdoe@gmail.com",
                "password": "password",
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
        
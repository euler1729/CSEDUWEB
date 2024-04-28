from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    role: str = Field(...)
    
    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "jdoe@gmail.com",
                "password": "password",
                "role": "admin"
            }
        }

class UpdateUserModel(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]
    role: Optional[str]
    
    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "jdoe@gmail.com",
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
        
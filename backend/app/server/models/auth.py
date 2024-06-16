from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str
    id: str

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJ",
                "token_type": "bearer",
                "id": "5f1b7c9c1c2d9a2e3d1e1d8f"
            }
        }

class DataToken(BaseModel):
    id: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": "5f1b7c9c1c2d9a2e3d1e1d8f"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "test@gmail.com",
                "password": "password"
            }
        }

class ResetInit(BaseModel):
    email: EmailStr = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "email": "abc@gmail.com"
            }
        }

class OTP(BaseModel):
    email: str
    otp: str
    expires_at: datetime

    class Config:
        json_schema_extra = {
            "example": {
                "email": "abc@gmail.com",
                "otp": "1234",
                "expires_at": "2020-07-24T00:00:00"
            }
        }
class ResetPassword(BaseModel):
    email: str
    password: str
    otp: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "abc@gmail.com",
                "password": "password",
                "otp": "1234"
            }
        }
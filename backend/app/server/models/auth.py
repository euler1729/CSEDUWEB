from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJ",
                "token_type": "bearer"
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
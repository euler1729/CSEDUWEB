from typing import Optional
from pydantic import BaseModel, Field, EmailStr

class MessageBaseModel(BaseModel):
    name: Optional[str] = Field(...)
    email: Optional[EmailStr] = Field(...)
    subject: Optional[str] = Field(...)
    message: Optional[str] = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "abc@gmail.com",
                "subject": "Regarding the query",
                "message": "This is the message",
            }
        }

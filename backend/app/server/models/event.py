from typing import Optional
from pydantic import BaseModel, EmailStr, Field


'''
public:   0000
admin:    0001
student:  0010
alumni:   0100
teacher:  1000
'''

class EventsBaseModel(BaseModel):
    event_title:str=Field(...)
    date:str=Field(...)
    description:str=Field(...)
    venue:str=Field(...)
    date_and_time:str=Field(...)
    photo:str=Field(...)
    allowed_roles: int = Field(...)
    class Config:
        json_schema_extra = {
            "example": {
                "event_title": "Code Samurai 2024",
                "date": "07-05-2024",
                "description": "something about the event",
                "venue":"CSE,DU",
                "date_and_time" : "20-05-2024 10:00 AM",
                "photo": "photo url",
                "allowed_roles": 1
            }
        }


class UpdateEventsBaseModel(BaseModel):
    event_title:Optional[str]
    date:Optional[str]
    description:Optional[str]
    venue:Optional[str]
    date_and_time:Optional[str]
    photo:Optional[str]
    allowed_roles: Optional[int]
    class Config:
        json_schema_extra = {
            "example": {
                "event_title": "Code Samurai 2024",
                "date": "07-05-2024",
                "description": "something about the event",
                "venue":"CSE,DU",
                "date_and_time" : "20-05-2024 10:00 AM",
                "photo": "photo url",
                "allowed_roles": 1
            }
        }


# User form Data
class UserFormModel(BaseModel):
    event_id: str = Field(...)
    user_id: str = Field(...)
    name: str = Field(...)
    email: EmailStr = Field(...)
    phone: str = Field(...)
    amount: int = Field(...)
    trxId: str = Field(...)
    comment: Optional[str] = Field(...)
    status: Optional[str] = Field("pending")

    class Config:
        json_schema_extra = {
            "example": {
                "event_id": "60d0fe0b9d1d1f0c1c9c8c6c",
                "user_id": "60d0fe0b9d1d1f0c1c9c8c6c",
                "name": "John Doe",
                "email": "abc@gmail.com",
                "phone": "1234567890",
                "amount": 1000,
                "trxId": "123456",
                "comment": "I am interested in this event",
                "status": "pending"
            }
        }

# User form Update Data
class UpdateUserFormModel(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    amount: Optional[int]
    trxId: Optional[str]
    comment: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "event_id": "60d0fe0b9d1d1f0c1c9c8c6c",
                "user_id": "60d0fe0b9d1d1f0c1c9c8c6c",
                "name": "John Doe",
                "email": "abc@gmail.com",
                "phone": "1234567890",
                "amount": 1000,
                "trxId": "123456",
                "comment": "I am interested in this event",
                "status": "pending"
            }
        }



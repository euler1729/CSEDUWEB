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

class NewsBaseModel(BaseModel):
    news_title:str=Field(...)
    date:str=Field(...)
    description:str=Field(...)
    photo:str=Field(...)
    class Config:
        json_schema_extra = {
            "example": {
                "news_title": "Offline Class will be held from Wednesday",
                "date": "07-05-2024",
                "description": "something about the news",
                "photo": "photo url",
            }
        }

class UpdateNewsBaseModel(BaseModel):
    news_title:Optional[str]
    date:Optional[str]
    description:Optional[str]
    photo:Optional[str]
    class Config:
        json_schema_extra = {
            "example": {
                "news_title": "Offline Class will be held from Wednesday",
                "date": "07-05-2024",
                "description": "something about the news",
                "photo": "photo url",
            }
        }

class EventsBaseModel(BaseModel):
    event_title:str=Field(...)
    date:str=Field(...)
    description:str=Field(...)
    venue:str=Field(...)
    date_and_time:str=Field(...)
    photo:str=Field(...)
    class Config:
        json_schema_extra = {
            "example": {
                "event_title": "Code Samurai 2024",
                "date": "07-05-2024",
                "description": "something about the event",
                "venue":"CSE,DU",
                "date_and_time" : "20-05-2024 10:00 AM",
                "photo": "photo url",
            }
        }

class UpdateEventsBaseModel(BaseModel):
    event_title:Optional[str]
    date:Optional[str]
    description:Optional[str]
    venue:Optional[str]
    date_and_time:Optional[str]
    photo:Optional[str]
    class Config:
        json_schema_extra = {
            "example": {
                "event_title": "Code Samurai 2024",
                "date": "07-05-2024",
                "description": "something about the event",
                "venue":"CSE,DU",
                "date_and_time" : "20-05-2024 10:00 AM",
                "photo": "photo url",
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
        
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

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



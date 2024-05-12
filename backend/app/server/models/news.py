from typing import Optional
from pydantic import BaseModel, EmailStr, Field

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
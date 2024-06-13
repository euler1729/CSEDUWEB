from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.news import (
    add_news,
    update_news,
    get_news,
    get_news_by_id
)
from server.models.news import (
    NewsBaseModel,
    UpdateNewsBaseModel,
)

from server.middlewares.auth import (
    check_token
)
from server.models.user import (
    UserSchema,
    ResponseModel,
    ErrorResponseModel,

)
router = APIRouter()

# updating news 
@router.put("/update/{news_id}")
@check_token
async def update_news_(news_id, updated_news: UpdateNewsBaseModel = Body(...)):
    news = {k: v for k, v in updated_news.dict().items() if v is not None}
    updated = await update_news(updated_data=news, id=news_id)
    if updated:
        return ResponseModel(
            "News with ID: {} news edited successful".format(news_id),
            "news updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )


# Creating news
@router.post("/add", response_description="News has been added")
@check_token
async def create_news(news: NewsBaseModel = Body(...)):
    recent_news = jsonable_encoder(news)
    recent = await add_news(recent_news)
    return ResponseModel(recent, "News added successfully")


# getting all news
@router.get("/all", response_description="News viewed")
@check_token
async def get_news_():
    recent_news = await get_news()
    if recent_news:
        return ResponseModel("News are viewed successfully")
    return ResponseModel(recent_news, "No news")


# getting news by id
@router.get("/{news_id}")
@check_token
async def get_news_id(news_id):
    news = await get_news_by_id(id=news_id)
    if news:
        return ResponseModel("News are viewed successfully")
    return ResponseModel(news, "Couldn't find this news")

__all__ = ["router"]


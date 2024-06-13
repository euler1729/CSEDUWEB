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
async def update_news_(request: Request, response: Response, news_id, updated_news: UpdateNewsBaseModel = Body(...)):
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
async def create_news(request: Request, response: Response, news: NewsBaseModel = Body(...)):
    try:
        news = jsonable_encoder(news)
        recent_news = await add_news(news)
        return ResponseModel(recent_news, "News added successfully")
    except:
        return ErrorResponseModel("An error occurred", status="400")


# getting all news
@router.get("/all", response_description="News viewed")
@check_token
async def get_news_(request: Request, response: Response,):
    recent_news = await get_news()
    if recent_news:
        return ResponseModel(recent_news, "News are viewed successfully")
    return ResponseModel(recent_news, "No news")

# getting news by id
@router.get("/{news_id}")
@check_token
async def get_news_id(request: Request, response: Response, news_id):
    news = await get_news_by_id(id=news_id)
    if news:
        return ResponseModel(news, "News are viewed successfully")
    return ResponseModel(news, "Couldn't find this news")

__all__ = ["router"]


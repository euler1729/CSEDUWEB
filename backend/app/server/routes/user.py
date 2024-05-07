from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.user import (
    add_user,
    retrieve_users,
    retrieve_user,
    update_user,
    add_news,
    update_news,
    get_news,
    get_news_by_id,
    get_event_by_id,
    get_events,
    add_event,
    update_event

)
from server.models.user import (
    UserSchema,
    ResponseModel,
    ErrorResponseModel,
    NewsBaseModel,
    UpdateNewsBaseModel,
    EventsBaseModel,
    UpdateEventsBaseModel
)

from server.middlewares.auth import (
    check_token
)

router = APIRouter()


@router.post("/add", response_description="User data added into the database")
@check_token
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully.")




@router.get("/all", response_description="Users retrieved")
@check_token
async def get_users(request: Request, response: Response):
    user = request.state.user
    if(user['role'] != 'admin'):
        response.status_code = 401
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    users = await retrieve_users()
    if users:
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")

@router.get("/{user_id}")
@check_token
async def get_user(request: Request, response: Response, user_id: str):
    if user_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    user = await retrieve_user(user_id)
    if user:
        return ResponseModel(user, "User data retrieved successfully")
    return ResponseModel(user, "User not found")

@router.put("/update/{user_id}")
@check_token
async def update_user_data(request: Request, response: Response, user_id: str, user: UserSchema = Body(...)):
    if user_id != request.state.user['_id'] and request.state.user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    user = {k: v for k, v in user.dict().items() if v is not None}
    updated_user = await update_user(user_id, user)
    if updated_user:
        return ResponseModel(
            "User with ID: {} name update is successful".format(user_id),
            "User name updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )


# updating news 
@router.put("/update/news/{news_id}")
@check_token
async def update_news_(news_id,updated_news:UpdateNewsBaseModel=Body(...)):
    news = {k: v for k, v in updated_news.dict().items() if v is not None}
    updated=await update_news(updated_data=news,id=news_id)
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
@router.post("/add/news",response_description="News has been added")
@check_token
async def create_news(news:NewsBaseModel=Body(...)):
    recent_news=jsonable_encoder(news)
    recent=await add_news(recent_news)
    return ResponseModel(recent,"News added successfully")

# getting all news
@router.get("/news",response_description="News viewed")
@check_token
async def get_news_():
    recent_news=await get_news()
    if recent_news:
        return ResponseModel("News are viewed successfully")
    return ResponseModel(recent_news,"No news")

#getting news by id
@router.get("/news/{news_id}")
@check_token
async def get_news_id(news_id):
    news=await get_news_by_id(id=news_id)
    if news:
        return ResponseModel("News are viewed successfully")
    return ResponseModel(news,"Couldn't find this news")


# Creating event
@router.post("/add/events",response_description="event has been added")
@check_token
async def create_event(event:EventsBaseModel=Body(...)):
    events=jsonable_encoder(event)
    new_event=await add_event(events)
    return ResponseModel(new_event,"Event added successfully")

# getting event by id
@router.get("/events/{event_id}")
@check_token
async def get_event_id(event_id):
    event=await get_event_by_id(id=event_id)
    if event:
        return ResponseModel("Event viewed successfully")
    return ResponseModel(event,"Couldn't find this event")

# getting all events
@router.get("/events",response_description="Events viewed")
@check_token
async def get_event_():
    events=await get_events()
    if events:
        return ResponseModel("Events are viewed successfully")
    return ResponseModel(events,"Couldn't find events")

#updating events by event id
@router.put("/update/events/{event_id}")
@check_token
async def update_event_(event_id,updated_event:UpdateEventsBaseModel=Body(...)):
    events = {k: v for k, v in updated_event.dict().items() if v is not None}
    updated=await update_event(id=events,updated_data=events)
    if updated:
        return ResponseModel(
            "event with ID: {} event edited successful".format(event_id),
            "event updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )

__all__ = ["router"]


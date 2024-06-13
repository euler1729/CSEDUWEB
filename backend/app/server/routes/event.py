from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.event import (
    get_event_by_id,
    get_events,
    add_event,
    update_event
)

from server.models.event import (
    EventsBaseModel,
    UpdateEventsBaseModel
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


# getting all events
@router.get("/all", response_description="Events viewed")
@check_token
async def get_event_(request: Request, response: Response,):
    events = await get_events()
    if events:
        return ResponseModel(events, "Events are viewed successfully")
    return ResponseModel(events, "Couldn't find events")

# Creating event
@router.post("/add", response_description="Event has been added")
@check_token
async def create_event(request: Request, response: Response, event: EventsBaseModel = Body(...)):
    try:
        user = request.state.user
        if user["role"] != "admin":
            return ErrorResponseModel("You are not allowed to add event", 403)
        event = jsonable_encoder(event)
        try:
            recent_event = await add_event(event)
        except Exception as e:
            print(e)
            
        if recent_event:
            return ResponseModel(recent_event, "event added successfully")
        return ErrorResponseModel("An error occurred", 400)
    except:
        return ErrorResponseModel("You are not allowed to add event", 403)


# getting event by id
@router.get("/{event_id}")
@check_token
async def get_event_id(request: Request, response: Response, event_id):
    event = await get_event_by_id(id=event_id)
    if event:
        return ResponseModel(event, "Event viewed successfully")
    return ResponseModel(event, "Couldn't find this event")

# updating events by event id
@router.put("/update/{event_id}")
@check_token
async def update_event_(request: Request, response: Response, event_id, updated_event: UpdateEventsBaseModel = Body(...)):
    try:
        events = {k: v for k, v in updated_event.dict().items() if v is not None}
        updated = await update_event(id=event_id, updated_data=events)
        if updated:
            return ResponseModel(
                "event with ID: {} event edited successful".format(event_id),
                "event updated successfully",
            )
        return ErrorResponseModel(
            "An error occurred",
            404,
        )
    except Exception as e:
        print("error:"+e)
        return ErrorResponseModel("An error occurred", 400)


__all__ = ["router"]


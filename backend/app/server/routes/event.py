from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.event import (
    get_event_by_id,
    get_events,
    add_event,
    update_event,
    event_delete,
    event_register,
    get_event_registration_list,
    update_event_registration,
)

from server.models.event import (
    EventsBaseModel,
    UpdateEventsBaseModel,
    UserFormModel,
    UpdateUserFormModel
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

'''
public:   0000
admin:    0001
student:  0010
alumni:   0100
teacher:  1000
'''

def role_access(bit, role):
    if bit == 0:
        return True;
    if bit&1 and role == "admin":
        return True
    if bit&(1<<1) and role == "student":
        return True
    if bit&(1<<2) and role == "alumni":
        return True
    if bit&(1<<3) and role == "teacher":
        return True
    return False


# getting all events
@router.get("/all", response_description="Events viewed")
# @check_token
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
        print(event)
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
# @check_token
async def get_event_id(request: Request, response: Response, event_id):
    try:
        event = await get_event_by_id(id=event_id)
        if event:
            return ResponseModel(event, "Event viewed successfully")
        return ErrorResponseModel("Couldn't find this event", 404, "Event not found")
    except Exception as e:
        print("error: ", e)
        return ErrorResponseModel("An error occurred", 400, e)

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

# Event Registration For CSEDU People
@router.post("/register/private/{event_id}")
@check_token
async def register_event(request: Request, response: Response, event_id: str, form: UserFormModel = Body(...)):
    try:
        event = await get_event_by_id(id=event_id)
        if not event:
            return ErrorResponseModel("Event not found", 404, "Event not found")
            
        user = request.state.user
        if not role_access(event["allowed_roles"], user["role"]):
            return ErrorResponseModel("You are not allowed to register for this event", 403, "Unauthorized Access")

        form = jsonable_encoder(form)
        success = await event_register(event_id, form)
        if not success:
            return ErrorResponseModel("Maybe Already Registered!", 400, "An error occurred")
        return ResponseModel("Event registered successfully", "Event registered successfully")
    except Exception as e:
        print("error: ", e)
        return ErrorResponseModel("An error occurred", 400, e)

@router.put("/register/update/{event_id}/{user_id}")
@check_token
async def update_registration(request: Request, response: Response, event_id: str, user_id: str, form: UpdateUserFormModel = Body(...)):
    try:
        event = await get_event_by_id(id=event_id)
        if not event:
            return ErrorResponseModel("Event not found", 404, "Event not found")
            
        user = request.state.user

        if not user["role"] == "admin":
            return ErrorResponseModel("You are not allowed to update this registration", 403, "Unauthorized Access")

        form = jsonable_encoder(form)
        if not user_id==form["user_id"]:
            return ErrorResponseModel("User ID doesn't match", 400, "User ID doesn't match")
        
        success = await update_event_registration(form=form)

        if not success:
            return ErrorResponseModel("An error occurred", 400, "An error occurred")

        return ResponseModel("Event registration updated successfully", "Event registration updated successfully")
    except Exception as e:
        print("error: ", e)
        return ErrorResponseModel("An error occurred", 400, "Unknown error")

# getting event registration list
@router.get("/register/list/{event_id}")
@check_token
async def get_registration_list(request: Request, response: Response, event_id):
    try:
        event = await get_event_by_id(id=event_id)
        if not event:
            return ErrorResponseModel("Event not found", 404, "Event not found")
        user = request.state.user
        if not user["role"] == "admin":
            return ErrorResponseModel("You are not allowed to view this list", 403, "Unauthorized Access")
        registration_list = await get_event_registration_list(event_id)
        return ResponseModel(registration_list, "Event registration list viewed successfully")
    except Exception as e:
        print("error: ", e)
        return ErrorResponseModel("An error occurred", 400, e)

# deleting event by id
@router.delete("/delete/{event_id}")
@check_token
async def delete_event(request: Request, response: Response, event_id):
    try:
        if request.state.user["role"] != "admin":
            return ErrorResponseModel("You are not allowed to delete event", 403)
        deleted = await event_delete(id=event_id)

        if deleted:
            return ResponseModel(
                "event with ID: {} removed".format(event_id),
                "event deleted successfully",
            )
        return ErrorResponseModel(
            "An error occurred",
            404,
        )
    except Exception as e:
        print("error: "+e)
        return ErrorResponseModel("An error occurred", 400)

__all__ = ["router"]


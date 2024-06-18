from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

from server.controller.message import (
    add_message,
    get_message_all,
    get_message_by_id
)
from server.models.user import (
    ResponseModel,
    ErrorResponseModel
)
from server.models.message import (
    MessageBaseModel
)
from server.middlewares.auth import (
    check_token
)

router = APIRouter()


# add message
@router.post("/add", response_description="Message has been added")
async def create_message(request: Request, response: Response, message: MessageBaseModel = Body(...)):
    try:
        message = jsonable_encoder(message)
        recent_message = await add_message(message)
        return ResponseModel(recent_message, "Message added successfully")
    except Exception as e:
        print(e)
        return ErrorResponseModel("An error occurred", status="400", message="Message not added")

# get all messages
@router.get("/all", response_description="Messages retrieved")
@check_token
async def get_messages(request: Request, response: Response):
    try:
        messages = await get_message_all()
        if messages:
            return ResponseModel(messages, "Messages retrieved successfully")
        return ResponseModel(messages, "Empty list returned")
    except Exception as e:
        print(e)
        return ErrorResponseModel("An error occurred", status="400", message="Messages not found")

# get message by id
@router.get("/{id}", response_description="Message retrieved")
@check_token
async def get_message(request: Request, response: Response, id):
    try:
        message = await get_message_by_id(id)
        if message:
            return ResponseModel(message, "Message retrieved successfully")
        return ErrorResponseModel("Message not found", status="404", message="Message not found")
    except Exception as e:
        print(e)
        return ErrorResponseModel("An error occurred", status="400", message="Message not found")


__all__ = ["router"]
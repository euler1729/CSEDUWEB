from app.server.database import (
    db
)
from app.server.utils import (
    hash_password
)
from app.server.controller.auth import (
    verify_token
)
from bson import ObjectId
from fastapi import Request, Response, status

events_collection = db["events"]


# helper function for events
def event_helper(event) -> dict:
    return {
        "id": event["_id"],
        "event_title": event["event_title"],
        "date": event["date"],
        "description": event["description"],
        "venue": event["venue"],
        "date_and_time": event["date_and_time"],
        "photo": event["photo"]
    }


# for adding an event
async def add_event(event_data: dict):
    events = events_collection.insert_one(event_data)
    event = events_collection.find_one({"_id": events.inserted_id})
    return event_helper(event)


# getting all events
async def get_events():
    events = events_collection.find()
    list = []
    for i in events:
        list.append(event_helper(i))

    return list


# For updating particular event
async def update_event(id: str, updated_data: dict):
    if len(updated_data) < 1:
        return False
    events = events_collection.find_one({"_id": ObjectId(id)})
    if events:
        updated_events = events_collection.update_one({"_id", ObjectId(id)}, {"$set": updated_data})
        if updated_events:
            return True
        return False


# news by id
async def get_event_by_id(id: str):
    events = events_collection.find_one({"_id": ObjectId(id)})
    if events:
        return event_helper(event=events)
    return None

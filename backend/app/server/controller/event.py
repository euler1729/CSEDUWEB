from bson import ObjectId
from fastapi import Request, Response, status

from server.database import (
    db
)
events_collection = db["events"]
event_registration_form_collection = db["event_registration_form"]

# helper function for events
def event_helper(event) -> dict:
    try:
        allowed_roles = event["allowed_roles"] if event["allowed_roles"] else 1
    except Exception as e:
        # print(e)
        allowed_roles = 1
    return {
        "id": str(event["_id"]),
        "event_title": event["event_title"],
        "date": event["date"],
        "description": event["description"],
        "venue": event["venue"],
        "date_and_time": event["date_and_time"],
        "photo": event["photo"],
        "allowed_roles": allowed_roles
    }

def event_registration_helper(event) -> dict:
    return {
        "id": str(event["_id"]),
        "event_id": event["event_id"],
        "user_id": event["user_id"],
        "name": event["name"],
        "email": event["email"],
        "phone": event["phone"],
        "amount": event["amount"],
        "trxId": event["trxId"],
        "comment": event["comment"],
        "status": event["status"]
    }

# for adding an event
async def add_event(event_data: dict):
    try:
        recent_events = events_collection.insert_one(event_data)
        recent = events_collection.find_one({"_id": recent_events.inserted_id})
        return event_helper(recent)
    except:
        return None


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
    print(events)
    if events:
        updated_events = events_collection.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
        if updated_events:
            return True
        return False
    print("No event found")
    return False

# news by id
async def get_event_by_id(id: str):
    event = events_collection.find_one({"_id": ObjectId(id)})
    if event:
        return event_helper(event=event)
    return None

# event registration
async def event_register(event_id: str, form: dict):
    try:
        query = {
            "$or": []
        }
        if form['email'] and form['email'] != "null":
            query['$or'].append({"event_id":event_id, "email": form['email']})
        if form['user_id'] and form['user_id'] != "null":
            query['$or'].append({"event_id":event_id, "user_id": form['user_id']})

        # print(query)
        
        if len(query['$or']) == 0:
            return False
        
        event_registration = event_registration_form_collection.find_one(query)

        if event_registration:
            print("Already registered")
            return False
        try:
            recent_event_registration = event_registration_form_collection.insert_one(form)
            print(recent_event_registration)
            return True
        except Exception as e:
            print(e)
            return False
    except Exception as e:
        print(e)
        return False

# updating event registration
async def update_event_registration(form: dict):
    try:
        id = form["id"]

        event_registration = event_registration_form_collection.find_one({"_id": ObjectId(id)})

        if not event_registration:
            return False

        updated_event_registration = event_registration_form_collection.update_one({"_id": ObjectId(id)}, 
            {
                "$set":{
                    "name": form["name"] if form["name"] else event_registration["name"],
                    "email": form["email"] if form["email"] else event_registration["email"],
                    "phone": form["phone"] if form["phone"] else event_registration["phone"],
                    "amount": form["amount"] if form["amount"] else event_registration["amount"],
                    "trxId": form["trxId"] if form["trxId"] else event_registration["trxId"],
                    "comment": form["comment"] if form["comment"] else event_registration["comment"],
                    "status": form["status"] if form["status"] else event_registration["status"]
                }
            }
        )
        if updated_event_registration:
            return True
        return False        
    except Exception as e:
        print(e)
        return False

async def get_event_registration_list(event_id: str):
    event_registration = event_registration_form_collection.find({"event_id": event_id})
    list = []
    for i in event_registration:
        list.append(event_registration_helper(i))
    return list

# deleting event by id
async def event_delete(id: str):
    events = events_collection.delete_one({"_id": ObjectId(id)})
    if events.deleted_count == 1:
        return True
    return False
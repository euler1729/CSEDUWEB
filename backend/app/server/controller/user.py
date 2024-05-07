from server.database import (
    db
)
from server.utils import (
    hash_password
)
from server.controller.auth import (
    verify_token
)
from bson import ObjectId
from fastapi import Request, Response, status

users_collection = db["users"]
news_collection=db["news"]
events_collection=db["events"]


# helpers
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": user["email"],
        "address": user["address"],
        "contact": user["contact"],
        "city": user["city"],
        "state": user["state"],
        "role": user["role"],
    }
# helper function for news
def news_helper(news)->dict:
    return {
        "id":str(news["_id"]),
        "news_title":news["news_title"],
        "date":news["date"],
        "description":news["description"],
        "photo":news["photo"],
    }

# helper function for events
def event_helper(event)->dict:
    return {
        "id":event["_id"],
        "event_title":event["event_title"],
        "date":event["date"],
        "description":event["description"],
        "venue":event["venue"],
        "date_and_time":event["date_and_time"],
        "photo":event["photo"]
    }
# Add a new user into to the database
async def add_user(user_data: dict):
    password = hash_password(user_data["password"])
    print("Password is ", password)
    user_data["password"] = password
    user =  users_collection.insert_one(user_data)
    new_user =  users_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)

# Retrieve all users present in the database
async def retrieve_users():
    users = users_collection.find()
    user_list = []
    for user in users:
        user_list.append(user_helper(user))
    return user_list



# Retrieve a user with a matching ID
async def retrieve_user(id: str):
    user =  users_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)
    return None


# Update a user with a matching ID
async def update_user(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user =  users_collection.find_one({"_id": ObjectId(id)})
    if user:
        updated_user =  users_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_user:
            return True
        return False

# for adding a news
async def add_news(news_data:dict):
    recent_news=news_collection.insert_one(news_data)
    recent=news_collection.find_one({"_id":recent_news.inserted_id})
    return news_helper(recent)



#for updating particular news
async def update_news(id:str,updated_data:dict):

    if len(updated_data)<1:
        return False
    news=news_collection.find_one({"_id":ObjectId(id)})
    if news:
        updated_news=news_collection.update_one({"_id":ObjectId(id)},{"$set":updated_data})
        if updated_news:
            return True
        return False
    

#getting all news
async def get_news():
    news=news_collection.find()
    list=[]
    for i in news:
        list.append(news_helper(i))
    return list

# event by id
async def get_news_by_id(id:str):
    news=news_collection.find_one({"_id":ObjectId(id)})
    if news:
        return news_collection(news)
    return None

# for adding an event
async def add_event(event_data:dict):
    events=events_collection.insert_one(event_data)
    event=events_collection.find_one({"_id":events.inserted_id})
    return news_helper(event)

# getting all events
async def get_events():
    events=events_collection.find()
    list=[]
    for i in events:
        list.append(event_helper(i))

    return list

# For updating particular event
async def update_event(id:str,updated_data:dict):
    if len(updated_data)<1:
        return False
    events=events_collection.find_one({"_id":ObjectId(id)})
    if events:
        updated_events=events_collection.update_one({"_id",ObjectId(id)},{"$set":updated_data})
        if updated_events:
            return True
        return False
    

# news by id
async def get_event_by_id(id:str):
    events=events_collection.find_one({"_id":ObjectId(id)})
    if events:
        return event_helper(event=events)
    return None


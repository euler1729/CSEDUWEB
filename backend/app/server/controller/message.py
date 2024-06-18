from server.database import (
    message_collection
)

from bson import ObjectId
from fastapi import Request, Response, status


# helper function for message
def message_helper(message)->dict:
    try:
        return {
            "id":str(message["_id"]),
            "name":message["name"],
            "email":message["email"],
            "subject":message["subject"],
            "message":message["message"],
        }
    except Exception as e:
        print(e)
        return False

# add message
async def add_message(message_data:dict):
    try:
        recent_message=message_collection.insert_one(message_data)
        recent=message_collection.find_one({"_id":recent_message.inserted_id})
        return message_helper(recent)
    except Exception as e:
        print(e)
        return False

# get all messages
async def get_message_all():
    try:
        messages=message_collection.find()
        list=[]
        for i in messages:
            list.append(message_helper(i))
        return list
    except Exception as e:
        print(e)
        return False

# get message by id
async def get_message_by_id(id:str):
    try:
        message=message_collection.find_one({"_id":ObjectId(id)})
        if message:
            return message_helper(message)
        return False
    except Exception as e:
        print(e)
        return False
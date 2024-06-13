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

staffs_collection = db["staffs"]

# helpers

def staff_helper(staff)->dict:
    return{
        "id": str(staff["_id"]),
        "first_name": staff["first_name"],
        "last_name": staff["last_name"],
        "email": staff["email"],
        "address": staff["address"],
        "contact": staff["contact"],
        "city": staff["city"],
        "role": staff["role"],
        "photo": staff["photo"],
    }

async def add_staff(staff_data:dict):
    staff=staffs_collection.insert_one(staff_data)
    new_staff=staffs_collection.find_one({"_id":staff.inserted_id})
    return staff_helper(new_staff)

async def retrieve_all_staffs():
    staffs=staffs_collection.find()
    staffs_list=[]
    for staff in staffs:
        staffs_list.append(staff_helper(staff=staff))
    
    return staffs_list

async def retrieve_one_staff(id:str):
    staff=staffs_collection.find_one({"_id":ObjectId(id)})
    if staff:
        return staff_helper(staff=staff)
    
    return None

async def update_staff(id:str,data:dict):
    if len(data)<1:
        return False
    
    staff=staffs_collection.find_one({"_id":ObjectId(id)})
    if staff:
        updated_staff=staffs_collection.update_one(
            {"_id":ObjectId(id)},
            {"$set":data}
        )
        if updated_staff:
            return True
        return False
    
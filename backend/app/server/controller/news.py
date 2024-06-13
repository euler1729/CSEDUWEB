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

news_collection=db["news"]


# helper function for news
def news_helper(news)->dict:
    return {
        "id":str(news["_id"]),
        "news_title":news["news_title"],
        "date":news["date"],
        "description":news["description"],
        "photo":news["photo"],
    }


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


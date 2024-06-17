from bson import ObjectId
from fastapi import Request, Response, status

from server.database import (
    db,
    users_collection,
    news_collection,
    events_collection,
    event_registration_form_collection,
    alumni_collection,
    research_collection,
    teachers_collection,
    students_collection,
)

# Event Stats
async def get_event_stats():
    try:
        event_stats = []
        for event in events_collection.find({}):
            event_id = event["_id"]
            event_title = event["event_title"]
            count = event_registration_form_collection.count_documents({"event_id": str(event_id)})
            event_stats.append({
                "event_id": str(event_id),
                "event_title": event_title,
                "count": count
            })
        return event_stats
    except Exception as e:
        print(e)
        return False
    

# getting all stats: news, events, users
async def get_stats():
    try:
        # User Stats
        user_stats = {}
        user_stats["total"] = users_collection.count_documents({})
        user_stats["admin"] = users_collection.count_documents({"role": "admin"})
        user_stats["student"] = students_collection.count_documents({})
        user_stats["teacher"] = teachers_collection.count_documents({})
        user_stats["alumni"] = alumni_collection.count_documents({})
        user_stats["researcher"] = research_collection.count_documents({})

        # News Stats
        news_stats = {}
        news_stats["total"] = news_collection.count_documents({})

        # Event Stats
        event_stats = {}
        event_stats["total"] = events_collection.count_documents({})
        event_stats["total_registration"] = event_registration_form_collection.count_documents({})
        event_stats["info"] = await get_event_stats()

        return {
            "user_stats": user_stats,
            "news_stats": news_stats,
            "event_stats": event_stats
        }
    except Exception as e:
        print(e)
        return False
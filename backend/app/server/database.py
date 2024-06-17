from pymongo import MongoClient
import os

print("Connecting to MongoDB...")
uri = os.getenv("MONGO_URI")

client = MongoClient(uri)
db = client["user_db"]
users_collection = db["users"]
news_collection=db["news"]
events_collection=db["events"]
event_registration_form_collection = db["event_registration_form"]
students_collection = db["students"]
teachers_collection = db["teachers"]
alumni_collection = db["alumni"]
research_collection = db["research"]
from pymongo import MongoClient

print("Connecting to MongoDB...")
uri = "mongodb+srv://IP_Lab:in3JffMHPrAdlzM3@cluster0.bnmqd0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Here Change your username password Only Third Bracket part
# uri = "mongodb+srv://[]:[]@cluster0.bnmqd0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


client = MongoClient(uri)
db = client["user_db"]
users_collection = db["users"]
news_collection=db["news"]
events_collection=db["events"]

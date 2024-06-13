from server.database import db
from bson import ObjectId

research_collection = db["research"]

# Helper function for research
def research_helper(research) -> dict:
    return {
        "id": str(research["_id"]),
        "publication_type": research["publication_type"],
        "paper_name": research["paper_name"],
        "authors": research["authors"],
        "publication_year": research["publication_year"],
    }

# Adding a research publication
async def add_research(research_data: dict):
    recent_research = research_collection.insert_one(research_data)
    recent = research_collection.find_one({"_id": recent_research.inserted_id})
    return research_helper(recent)

# Updating a particular research publication
async def update_research(id: str, updated_data: dict):
    if len(updated_data) < 1:
        return False
    research = research_collection.find_one({"_id": ObjectId(id)})
    if research:
        updated_research = research_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": updated_data}
        )
        if updated_research:
            return True
        return False

# Getting all research publications
async def get_all_research():
    research = research_collection.find()
    list = []
    for r in research:
        list.append(research_helper(r))
    return list

# Getting a research publication by id
async def get_research_by_id(id: str):
    research = research_collection.find_one({"_id": ObjectId(id)})
    if research:
        return research_helper(research)
    return None

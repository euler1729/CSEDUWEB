from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from server.database import db

from server.controller.research import (
    add_research,
    update_research,
    get_all_research,
    get_research_by_id
)
from server.models.research import (
    ResearchBaseModel,
    UpdateResearchBaseModel,
)

from server.middlewares.auth import (
    check_token
)
from server.models.user import (
    ResponseModel,
    ErrorResponseModel,
)

router = APIRouter()

# Updating a research publication
@router.put("/update/{research_id}")
@check_token
async def update_research_(request: Request, response: Response, research_id: str, updated_research: UpdateResearchBaseModel = Body(...)):
    research = {k: v for k, v in updated_research.dict().items() if v is not None}
    updated = await update_research(updated_data=research, id=research_id)
    if updated:
        return ResponseModel(
            "Research with ID: {} updated successfully".format(research_id),
            "Research updated successfully",
        )
    return ResponseModel(
        "An error occurred",
        "An error occurred",
        status="400",
    )

# Creating a research publication
@router.post("/add", response_description="Research has been added")
# @check_token
async def create_research(request: Request, response: Response, research: ResearchBaseModel = Body(...)):
    recent_research = jsonable_encoder(research)
    recent = await add_research(recent_research)
    return ResponseModel(recent, "Research added successfully")

# Getting all research publications
@router.get("/all", response_description="Research viewed")
# @check_token
async def get_all_research_(request: Request, response: Response):
    research_list = await get_all_research()
    if research_list:
        return ResponseModel(research_list, "Research viewed successfully")
    return ResponseModel(research_list, "No research found")

# Getting a research publication by id
@router.get("/{research_id}")
# @check_token
async def get_research_id(request: Request, response: Response, research_id: str):
    research = await get_research_by_id(id=research_id)
    print(research_id, research)
    if research:
        return ResponseModel(research, "Research viewed successfully")
    return ResponseModel(research, "Couldn't find this research")
# Deleting a research publication
@router.delete("/delete/{research_id}", response_description="Delete a research publication")
@check_token
async def delete_one_research(request: Request, response: Response, research_id: str):
    user = request.state.user
    if user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    try:
        delete_result = db["research"].delete_one({"_id": ObjectId(research_id)})
        if delete_result.deleted_count == 1:
            return ResponseModel(
            "Research with ID: {} deleted successfully".format(research_id),
            "Research deleted successfully",
        )
    except Exception as e:
        print(e)
        return ResponseModel(
        "An error occurred",
        "Research with ID: {} not found".format(research_id),
    )

# Deleting all research publications
@router.delete("/delete-all", response_description="Delete all research publications")
@check_token
async def delete_all_research(request: Request, response: Response):
    user = request.state.user
    if user['role'] != 'admin':
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return ErrorResponseModel("Unauthorized", "Unauthorized")
    
    delete_result = db["research"].delete_many({})
    return ResponseModel(
        "{} research publications deleted successfully".format(delete_result.deleted_count),
        "All research publications deleted successfully",
    )
__all__ = ["router"]

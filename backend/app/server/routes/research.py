from fastapi import APIRouter, Body, Request, Response, status
from fastapi.encoders import jsonable_encoder

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
@check_token
async def create_research(request: Request, response: Response, research: ResearchBaseModel = Body(...)):
    recent_research = jsonable_encoder(research)
    recent = await add_research(recent_research)
    return ResponseModel(recent, "Research added successfully")

# Getting all research publications
@router.get("/all", response_description="Research viewed")
@check_token
async def get_all_research_(request: Request, response: Response):
    research_list = await get_all_research()
    if research_list:
        return ResponseModel(research_list, "Research viewed successfully")
    return ResponseModel(research_list, "No research found")

# Getting a research publication by id
@router.get("/{research_id}")
@check_token
async def get_research_id(request: Request, response: Response, research_id: str):
    research = await get_research_by_id(id=research_id)
    if research:
        return ResponseModel(research, "Research viewed successfully")
    return ResponseModel(research, "Couldn't find this research")

__all__ = ["router"]

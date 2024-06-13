from typing import List, Optional
from pydantic import BaseModel, Field

class ResearchBaseModel(BaseModel):
    publication_type: str = Field(...)
    paper_name: str = Field(...)
    authors: List[str] = Field(...)
    publication_year: int = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "publication_type": "Journal",
                "paper_name": "Advanced Cryptography Techniques",
                "authors": ["Alice Smith", "Bob Johnson"],
                "publication_year": 2024,
            }
        }

class UpdateResearchBaseModel(BaseModel):
    publication_type: Optional[str]
    paper_name: Optional[str]
    authors: Optional[List[str]]
    publication_year: Optional[int]

    class Config:
        json_schema_extra = {
            "example": {
                "publication_type": "Journal",
                "paper_name": "Advanced Cryptography Techniques",
                "authors": ["Alice Smith", "Bob Johnson"],
                "publication_year": 2024,
            }
        }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.server.routes.user import router as UserRouter
from app.server.routes.auth import router as AuthRouter

app = FastAPI()

app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "DELETE"],
    allow_headers=["*"],
)
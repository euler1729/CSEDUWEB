from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routes.user import router as UserRouter
from server.routes.auth import router as AuthRouter
from server.routes.news import router as NewsRouter
from server.routes.event import router as EventRouter

app = FastAPI()

app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")
app.include_router(NewsRouter, tags=["News"], prefix="/news")
app.include_router(EventRouter, tags=["Event"], prefix="/event")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "DELETE"],
    allow_headers=["*"],
)
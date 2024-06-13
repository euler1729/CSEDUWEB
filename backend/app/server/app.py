from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

<<<<<<< HEAD
from server.routes.user import router as UserRouter
from server.routes.auth import router as AuthRouter
=======
from app.server.routes.user import router as UserRouter
from app.server.routes.auth import router as AuthRouter
from app.server.routes.news import router as NewsRouter
from app.server.routes.event import router as EventRouter
>>>>>>> events-and-news

app = FastAPI()

app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")
<<<<<<< HEAD
=======
app.include_router(NewsRouter, tags=["News"], prefix="/news")
app.include_router(EventRouter, tags=["Event"], prefix="/event")
>>>>>>> events-and-news

# Enable CORS
app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=["http://localhost:5173"],  # Allow requests from all origins
=======
    allow_origins=["*"],  # Allow requests from all origins
>>>>>>> events-and-news
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "DELETE"],
    allow_headers=["*"],
)
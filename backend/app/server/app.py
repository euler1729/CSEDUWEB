from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routes.user import router as UserRouter
from server.routes.auth import router as AuthRouter
from server.routes.news import router as NewsRouter
from server.routes.event import router as EventRouter
from server.routes.research import router as ResearchRouter
from server.routes.alumni import router as AlumniRouter
from server.routes.student import router as StudentRouter
from server.routes.teacher import router as TeacherRouter

app = FastAPI()

app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")
app.include_router(NewsRouter, tags=["News"], prefix="/news")
app.include_router(EventRouter, tags=["Event"], prefix="/event")
app.include_router(ResearchRouter, tags=["Research"], prefix="/research")
app.include_router(AlumniRouter, tags=["Alumni"], prefix="/alumni")
app.include_router(StudentRouter, tags=["Student"], prefix="/student")
app.include_router(TeacherRouter, tags=["Teacher"], prefix="/teacher")


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "DELETE"],
    allow_headers=["*"],
)
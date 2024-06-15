from server.database import (
    db
)
from server.utils import (
    hash_password,
    verify_password,
)
from server.models.auth import (
    Token,
    DataToken,
    UserLogin,
)

from bson import ObjectId
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import Optional

users_collection = db["users"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="*/login")

SECRET_KEY = "54ddb88bfd0cd599dcb0a15f5edaca312815a3ff6dc0731fb404b605f692b87b"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300


def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # print(payload.get("id"))
        user = users_collection.find_one({"_id": ObjectId(payload.get("id"))})
        # print(user["_id"])
        if user:
            return user
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def authenticate_user(email: str, password: str):
    user = users_collection.find_one({"email": email})
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    access_token = create_access_token(data={"id": str(user["_id"])})

    return {"access_token": access_token, "_id": str(user["_id"])}
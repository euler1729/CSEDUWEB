from bson import ObjectId
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import Optional
import os
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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
    ResetInit,
)

users_collection = db["users"]
reset_password_collection = db["reset_password"]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="*/login")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
MAIL_KEY = os.getenv("MAIL_KEY")
EMAIL = os.getenv("EMAIL")

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

# generate random 6 digit number
def generate_otp():
    otp = ''.join(random.choices('0123456789', k=6))
    return otp

# Retrieve a user
async def retrieve_user(email: str):
    try:
        user = users_collection.find_one({"email": email})
        if user:
            return user
        return False
    except:
        return False

# send email
async def send_email(email: str, otp: str):
    try:
         # Email content
        message = MIMEMultipart()
        message['From'] = "office@cse.du.ac.bd"
        message['To'] = email
        message['Subject'] = "OTP for Password Reset"

        # Body of email
        email_message = f"Your OTP is <b>{otp}</b>. This OTP will expire in 5 minutes."
        message.attach(MIMEText(email_message, 'html'))

        # Create SMTP session for sending the mail
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(EMAIL, MAIL_KEY)
            text = message.as_string()
            server.sendmail(message['from'], email, text)
            server.quit()
            return True
        except Exception as e:
            print(e)
            return False
    except Exception as e:
        print(e)
        return False

# Check if OTP exists and is valid
async def send_otp(email: str):
    try:
        otp_info = reset_password_collection.find_one({"email": email})
        if otp_info:
            # print(otp_info["expires_at"], datetime.now())
            if  otp_info["expires_at"] <= datetime.now():
                otp = generate_otp()
                expires_at = datetime.now() + timedelta(minutes=5)
                reset_password_collection.update_one({"email": email}, {"$set": {"otp": otp, "expires_at": expires_at}})
                return await send_email(email, otp)
            return await send_email(email, otp_info["otp"])
        otp = generate_otp()
        expires_at = datetime.now() + timedelta(minutes=5)
        reset_password_collection.insert_one({"email": email, "otp": otp, "expires_at": expires_at})
        return await send_email(email, otp)
    except Exception as e:
        print(e)
        return False


# Reset Password Init
async def reset_password_send_email(email: str):
    user_info = await retrieve_user(email)
    if user_info:
        return await send_otp(email)
    return False

# Reset Password Confirm
async def reset_password_change_password(email: str, otp: str, password: str):
    try:
        otp_info = reset_password_collection.find_one({"email": email})
        if otp_info and otp_info["expires_at"] > datetime.now() and otp_info["otp"] == otp:
            users_collection.update_one({"email": email}, {"$set": {"password": hash_password(password)}})
            reset_password_collection.delete_one({"email": email})
            return True
        return False
    except Exception as e:
        print(e)
        return False
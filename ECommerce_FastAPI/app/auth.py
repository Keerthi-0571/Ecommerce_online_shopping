from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.oauth2 import create_access_token
from app.utils import verify_password


router = APIRouter(
    tags=["Authentication"]
)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    email = form_data.username.strip()
    password = form_data.password

    print("===============================")
    print("Email entered:", email)
    print("Password entered:", password)

    # Find user
    user = db.query(models.User).filter(
    models.User.email.ilike(email)
    ).first()
    print("Searching email:", email)

    print(
    "All emails:",
    db.query(models.User.email).all()
    )


    if not user:
        print("User not found")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    print("User found")
    print("Stored hash:", user.password)


    # Verify password
    result = verify_password(
        password,
        user.password
    )

    print("Verify result:", result)


    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    # Create JWT token
    access_token = create_access_token(
        data={
            "sub": user.email,
            "user_id": user.user_id
        }
    )


    return {
    "access_token": access_token,
    "token_type": "bearer",
    "user_id": user.user_id
}
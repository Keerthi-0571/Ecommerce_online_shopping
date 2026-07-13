from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas


router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


@router.post("/", response_model=schemas.ReviewResponse)
def add_review(
    review: schemas.ReviewCreate,
    db: Session = Depends(get_db)
):

    return crud.create_review(db, review)



@router.get("/")
def get_reviews(
    db: Session = Depends(get_db)
):

    return crud.get_reviews(db)
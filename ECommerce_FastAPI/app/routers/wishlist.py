from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas


router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"]
)


@router.post("/", response_model=schemas.WishlistResponse)
def add_wishlist(
    wishlist: schemas.WishlistCreate,
    db: Session = Depends(get_db)
):

    return crud.create_wishlist(db, wishlist)



@router.get("/")
def get_wishlist(
    db: Session = Depends(get_db)
):

    return crud.get_wishlist(db)
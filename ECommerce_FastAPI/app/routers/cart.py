from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.oauth2 import get_current_user

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)

@router.post("/", response_model=schemas.CartResponse)
def create_cart(
    cart: schemas.CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return crud.create_cart(db, cart)


@router.get("/", response_model=list[schemas.CartResponse])
def get_cart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return crud.get_cart(db)


@router.get("/{cart_id}", response_model=schemas.CartResponse)
def get_cart_item(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart = crud.get_cart_item(db, cart_id)

    if cart is None:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return cart


@router.put("/{cart_id}", response_model=schemas.CartResponse)
def update_cart(
    cart_id: int,
    cart: schemas.CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = crud.update_cart(db, cart_id, cart)

    if updated is None:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return updated


@router.delete("/{cart_id}")
def delete_cart(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = crud.delete_cart(db, cart_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return {"message": "Cart item deleted successfully"}
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.oauth2 import get_current_user

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# Create Order (Protected)
@router.post("/", response_model=schemas.OrderResponse)
def create_order(
    order: schemas.OrderCreate,
    db: Session = Depends(get_db)
):

    new_order = crud.create_order(db, order)

    crud.create_order_details_from_cart(
        db,
        new_order.order_id,
        order.user_id
    )

    return new_order


# Get All Orders (Protected)
@router.get("/", response_model=list[schemas.OrderResponse])
def get_orders(
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    return crud.get_orders(db)


# Get Order By ID (Protected)
@router.get("/{order_id}", response_model=schemas.OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    order = crud.get_order(db, order_id)

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


# Update Order (Protected)
@router.put("/{order_id}", response_model=schemas.OrderResponse)
def update_order(
    order_id: int,
    order: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    updated = crud.update_order(db, order_id, order)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return updated


# Delete Order (Protected)
@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    deleted = crud.delete_order(db, order_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return {
        "message": "Order deleted successfully"
    }
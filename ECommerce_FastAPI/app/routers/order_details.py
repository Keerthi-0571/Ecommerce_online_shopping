from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.oauth2 import get_current_user

router = APIRouter(
    prefix="/order-details",
    tags=["Order Details"]
)

# Create Order Detail
@router.post("/", response_model=schemas.OrderDetailResponse)
def create_order_detail(
    order_detail: schemas.OrderDetailCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return crud.create_order_detail(db, order_detail)


# Get All Order Details
@router.get("/", response_model=list[schemas.OrderDetailResponse])
def get_order_details(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return crud.get_order_details(db)


# Get Order Detail by ID
@router.get("/{order_detail_id}", response_model=schemas.OrderDetailResponse)
def get_order_detail(
    order_detail_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    order_detail = crud.get_order_detail(db, order_detail_id)

    if order_detail is None:
        raise HTTPException(status_code=404, detail="Order Detail not found")

    return order_detail


# Update Order Detail
@router.put("/{order_detail_id}", response_model=schemas.OrderDetailResponse)
def update_order_detail(
    order_detail_id: int,
    order_detail: schemas.OrderDetailCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = crud.update_order_detail(db, order_detail_id, order_detail)

    if updated is None:
        raise HTTPException(status_code=404, detail="Order Detail not found")

    return updated


# Delete Order Detail
@router.delete("/{order_detail_id}")
def delete_order_detail(
    order_detail_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = crud.delete_order_detail(db, order_detail_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Order Detail not found")

    return {"message": "Order Detail deleted successfully"}
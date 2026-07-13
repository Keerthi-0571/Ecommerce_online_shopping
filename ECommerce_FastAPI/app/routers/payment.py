from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.oauth2 import get_current_user


router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post("/", response_model=schemas.PaymentResponse)
def create_payment(
    payment: schemas.PaymentCreate,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    return crud.create_payment(db, payment)


@router.get("/", response_model=list[schemas.PaymentResponse])
def get_payments(
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    return crud.get_payments(db)


@router.get("/{payment_id}", response_model=schemas.PaymentResponse)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    payment = crud.get_payment(db, payment_id)

    if payment is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return payment


@router.put("/{payment_id}", response_model=schemas.PaymentResponse)
def update_payment(
    payment_id: int,
    payment: schemas.PaymentCreate,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    updated = crud.update_payment(db, payment_id, payment)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return updated


@router.delete("/{payment_id}")
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    deleted = crud.delete_payment(db, payment_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return {
        "message": "Payment deleted successfully"
    }
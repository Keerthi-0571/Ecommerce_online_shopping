from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.oauth2 import admin_only

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"]
)

# Create Supplier (Admin Only)
@router.post("/", response_model=schemas.SupplierResponse)
def create_supplier(
    supplier: schemas.SupplierCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):
    return crud.create_supplier(db, supplier)


# Get All Suppliers (Public)
@router.get("/", response_model=list[schemas.SupplierResponse])
def get_suppliers(db: Session = Depends(get_db)):
    return crud.get_suppliers(db)


# Get Supplier By ID (Public)
@router.get("/{supplier_id}", response_model=schemas.SupplierResponse)
def get_supplier(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    supplier = crud.get_supplier(db, supplier_id)

    if supplier is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return supplier


# Update Supplier (Admin Only)
@router.put("/{supplier_id}", response_model=schemas.SupplierResponse)
def update_supplier(
    supplier_id: int,
    supplier: schemas.SupplierCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):
    updated_supplier = crud.update_supplier(
        db,
        supplier_id,
        supplier
    )

    if updated_supplier is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return updated_supplier


# Delete Supplier (Admin Only)
@router.delete("/{supplier_id}")
def delete_supplier(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):
    deleted_supplier = crud.delete_supplier(
        db,
        supplier_id
    )

    if deleted_supplier is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return {
        "message": "Supplier deleted successfully"
    }
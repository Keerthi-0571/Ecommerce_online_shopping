from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app import crud, schemas
from app.oauth2 import admin_only

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


# Create Category (Admin Only)
@router.post("/", response_model=schemas.CategoryResponse)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):
    return crud.create_category(db, category)


# Get All Categories (Public)
@router.get("/", response_model=list[schemas.CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)


# Get Category By ID (Public)
@router.get("/{category_id}", response_model=schemas.CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = crud.get_category(db, category_id)

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return category


# Update Category (Admin Only)
@router.put("/{category_id}", response_model=schemas.CategoryResponse)
def update_category(
    category_id: int,
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):
    updated_category = crud.update_category(db, category_id, category)

    if updated_category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return updated_category


# Delete Category (Admin Only)
@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):
    try:
        deleted_category = crud.delete_category(db, category_id)

        if deleted_category is None:
            raise HTTPException(
                status_code=404,
                detail="Category not found"
            )

        return {
            "message": "Category deleted successfully"
        }

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Cannot delete category because it is assigned to one or more products."
        )
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    UploadFile,
    File,
    Form
)

from sqlalchemy.orm import Session
from typing import Optional
import os
import json
import shutil

from app.database import get_db
from app import crud, schemas
from app.oauth2 import admin_only

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -----------------------------
# Create Product with Image (Admin Only)
# -----------------------------
@router.post("/", response_model=schemas.ProductResponse)
def create_product(
    product: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):

    product_data = schemas.ProductCreate(
        **json.loads(product)
    )

    filename = None

    if image:

        filename = image.filename

        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        with open(filepath, "wb") as buffer:

            shutil.copyfileobj(
                image.file,
                buffer
            )

    return crud.create_product(
        db,
        product_data,
        filename
    )


# -----------------------------
# Get All Products / Search / Filter
# -----------------------------
@router.get("/", response_model=list[schemas.ProductResponse])
def get_products(
    search: Optional[str] = Query(None),
    category_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):

    return crud.get_products(
        db=db,
        search=search,
        category_id=category_id
    )


# -----------------------------
# Get Product By ID
# -----------------------------
@router.get("/{product_id}", response_model=schemas.ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = crud.get_product(
        db,
        product_id
    )

    if product is None:

        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


# -----------------------------
# Update Product
# -----------------------------
@router.put("/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    product_id: int,
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):

    updated = crud.update_product(
        db,
        product_id,
        product
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return updated


# -----------------------------
# Delete Product
# -----------------------------
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):

    # Get product first
    product = crud.get_product(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    # Delete image from uploads folder
    if product.image:
        image_path = os.path.join(
            UPLOAD_FOLDER,
            product.image
        )

        if os.path.exists(image_path):
            os.remove(image_path)

    # Delete product from database
    crud.delete_product(db, product_id)

    return {
        "message": "Product deleted successfully"
    }
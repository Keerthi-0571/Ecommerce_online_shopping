from pydantic import BaseModel

# ---------------- USERS ----------------

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    phone: str
    address: str
    role: str = "user"

class UserResponse(BaseModel):
    user_id: int
    name: str
    email: str
    phone: str
    address: str
    role: str

    class Config:
        from_attributes = True

# ---------------- CATEGORIES ----------------

class CategoryCreate(BaseModel):
    category_name: str
    description: str


class CategoryResponse(CategoryCreate):
    category_id: int

    class Config:
        from_attributes = True


# ---------------- SUPPLIERS ----------------

class SupplierCreate(BaseModel):
    supplier_name: str
    contact_person: str
    email: str
    phone: str
    address: str


class SupplierResponse(SupplierCreate):
    supplier_id: int

    class Config:
        from_attributes = True


# ---------------- PRODUCTS ----------------

class ProductCreate(BaseModel):
    product_name: str
    description: str
    price: float
    stock: int
    category_id: int
    supplier_id: int


class ProductResponse(BaseModel):
    product_id: int
    product_name: str
    description: str
    price: float
    stock: int
    image: str | None = None
    category_id: int
    supplier_id: int

    class Config:
        from_attributes = True
class CartCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int


class CartResponse(CartCreate):
    cart_id: int

    class Config:
        from_attributes = True
from datetime import datetime

class OrderCreate(BaseModel):
    user_id: int
    total_amount: float
    status: str


class OrderResponse(OrderCreate):
    order_id: int
    order_date: datetime

    class Config:
        from_attributes = True
class OrderDetailCreate(BaseModel):
    order_id: int
    product_id: int
    quantity: int
    price: float


class OrderDetailResponse(OrderDetailCreate):
    order_detail_id: int

    class Config:
        from_attributes = True
class PaymentCreate(BaseModel):
    order_id: int
    payment_method: str
    payment_status: str
    amount: float


class PaymentResponse(PaymentCreate):
    payment_id: int

    class Config:
        from_attributes = True
class Login(BaseModel):
    email: str
    password: str
# Wishlist Schema

class WishlistCreate(BaseModel):
    user_id: int
    product_id: int


class WishlistResponse(BaseModel):
    wishlist_id: int
    user_id: int
    product_id: int

    class Config:
        from_attributes = True



# Review Schema

class ReviewCreate(BaseModel):
    user_id: int
    product_id: int
    rating: int
    comment: str


class ReviewResponse(BaseModel):
    review_id: int
    user_id: int
    product_id: int
    rating: int
    comment: str

    class Config:
        from_attributes = True
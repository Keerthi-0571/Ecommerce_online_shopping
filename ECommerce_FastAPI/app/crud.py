from sqlalchemy.orm import Session
from app import models, schemas
from app.utils import hash_password


# Create User
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
    name=user.name,
    email=user.email,
    password=hash_password(user.password),
    phone=user.phone,
    address=user.address,
    role=user.role
)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

# Get All Users
def get_users(db: Session):
    return db.query(models.User).all()


# Get User By ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


# Update User
def update_user(db: Session, user_id: int, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(
        models.User.user_id == user_id
    ).first()

    if db_user:
        db_user.name = user.name
        db_user.email = user.email
        db_user.password = hash_password(user.password)
        db_user.phone = user.phone
        db_user.address = user.address

        db.commit()
        db.refresh(db_user)

    return db_user


# Delete User
def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()

    if db_user:
        db.delete(db_user)
        db.commit()

    return db_user
    # Create Category
def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(
        category_name=category.category_name,
        description=category.description
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


# Get All Categories
def get_categories(db: Session):
    return db.query(models.Category).all()


# Get Category By ID
def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(
        models.Category.category_id == category_id
    ).first()


# Update Category
def update_category(db: Session, category_id: int, category: schemas.CategoryCreate):
    db_category = db.query(models.Category).filter(
        models.Category.category_id == category_id
    ).first()

    if db_category:
        db_category.category_name = category.category_name
        db_category.description = category.description
        db.commit()
        db.refresh(db_category)

    return db_category


# Delete Category
def delete_category(db: Session, category_id: int):
    category = db.query(models.Category).filter(
        models.Category.category_id == category_id
    ).first()

    if category is None:
        return None

    db.delete(category)
    db.commit()

    return category
# -----------------------------
# Supplier CRUD Operations
# -----------------------------

def create_supplier(db: Session, supplier: schemas.SupplierCreate):
    db_supplier = models.Supplier(
        supplier_name=supplier.supplier_name,
        contact_person=supplier.contact_person,
        email=supplier.email,
        phone=supplier.phone,
        address=supplier.address
    )

    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)

    return db_supplier


def get_suppliers(db: Session):
    return db.query(models.Supplier).all()


def get_supplier(db: Session, supplier_id: int):
    return db.query(models.Supplier).filter(
        models.Supplier.supplier_id == supplier_id
    ).first()


def update_supplier(db: Session, supplier_id: int, supplier: schemas.SupplierCreate):
    db_supplier = db.query(models.Supplier).filter(
        models.Supplier.supplier_id == supplier_id
    ).first()

    if db_supplier:
        db_supplier.supplier_name = supplier.supplier_name
        db_supplier.contact_person = supplier.contact_person
        db_supplier.email = supplier.email
        db_supplier.phone = supplier.phone
        db_supplier.address = supplier.address

        db.commit()
        db.refresh(db_supplier)

    return db_supplier


def delete_supplier(db: Session, supplier_id: int):
    db_supplier = db.query(models.Supplier).filter(
        models.Supplier.supplier_id == supplier_id
    ).first()

    if db_supplier:
        db.delete(db_supplier)
        db.commit()

    return db_supplier
from typing import Optional

# -----------------------------
# Product CRUD Operations
# -----------------------------

def create_product(
    db: Session,
    product: schemas.ProductCreate,
    image=None
):

    db_product = models.Product(
        product_name=product.product_name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        category_id=product.category_id,
        supplier_id=product.supplier_id,
        image=image
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product
from typing import Optional

# -----------------------------
# Get All Products
# -----------------------------
def get_products(
    db: Session,
    search: Optional[str] = None,
    category_id: Optional[int] = None
):
    query = db.query(models.Product)

    if search:
        query = query.filter(
            models.Product.product_name.ilike(f"%{search}%")
        )

    if category_id:
        query = query.filter(
            models.Product.category_id == category_id
        )

    return query.all()


# -----------------------------
# Get Product By ID
# -----------------------------
def get_product(
    db: Session,
    product_id: int
):
    return db.query(models.Product).filter(
        models.Product.product_id == product_id
    ).first()


def update_product(
    db: Session,
    product_id: int,
    product: schemas.ProductCreate,
    image=None
):

    db_product = db.query(models.Product).filter(
        models.Product.product_id == product_id
    ).first()

    if db_product is None:
        return None

    db_product.product_name = product.product_name
    db_product.description = product.description
    db_product.price = product.price
    db_product.stock = product.stock
    db_product.category_id = product.category_id
    db_product.supplier_id = product.supplier_id

    if image is not None:
        db_product.image = image

    db.commit()
    db.refresh(db_product)

    return db_product


def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(
        models.Product.product_id == product_id
    ).first()

    if db_product is None:
        return None

    db.delete(db_product)
    db.commit()

    return db_product
# -----------------------------
# Cart CRUD
# -----------------------------

def create_cart(db: Session, cart: schemas.CartCreate):
    db_cart = models.Cart(
        user_id=cart.user_id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart


def get_cart(db: Session):
    return db.query(models.Cart).all()


def get_cart_item(db: Session, cart_id: int):
    return db.query(models.Cart).filter(
        models.Cart.cart_id == cart_id
    ).first()


def update_cart(db: Session, cart_id: int, cart: schemas.CartCreate):
    db_cart = db.query(models.Cart).filter(
        models.Cart.cart_id == cart_id
    ).first()

    if db_cart:
        db_cart.user_id = cart.user_id
        db_cart.product_id = cart.product_id
        db_cart.quantity = cart.quantity

        db.commit()
        db.refresh(db_cart)

    return db_cart


def delete_cart(db: Session, cart_id: int):
    db_cart = db.query(models.Cart).filter(
        models.Cart.cart_id == cart_id
    ).first()

    if db_cart:
        db.delete(db_cart)
        db.commit()

    return db_cart
# -----------------------------
# Order CRUD
# -----------------------------

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        user_id=order.user_id,
        total_amount=order.total_amount,
        status=order.status
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def get_orders(db: Session):
    return db.query(models.Order).all()


def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(
        models.Order.order_id == order_id
    ).first()


def update_order(db: Session, order_id: int, order: schemas.OrderCreate):
    db_order = db.query(models.Order).filter(
        models.Order.order_id == order_id
    ).first()

    if db_order:
        db_order.user_id = order.user_id
        db_order.total_amount = order.total_amount
        db_order.status = order.status

        db.commit()
        db.refresh(db_order)

    return db_order


def delete_order(db: Session, order_id: int):
    db_order = db.query(models.Order).filter(
        models.Order.order_id == order_id
    ).first()

    if db_order:
        db.delete(db_order)
        db.commit()

    return db_order
# -----------------------------
# Order Details CRUD
# -----------------------------

def create_order_detail(db: Session, order_detail: schemas.OrderDetailCreate):
    db_order_detail = models.OrderDetail(
        order_id=order_detail.order_id,
        product_id=order_detail.product_id,
        quantity=order_detail.quantity,
        price=order_detail.price
    )

    db.add(db_order_detail)
    db.commit()
    db.refresh(db_order_detail)

    return db_order_detail


def get_order_details(db: Session):
    return db.query(models.OrderDetail).all()


def get_order_detail(db: Session, order_detail_id: int):
    return db.query(models.OrderDetail).filter(
        models.OrderDetail.order_detail_id == order_detail_id
    ).first()


def update_order_detail(db: Session, order_detail_id: int, order_detail: schemas.OrderDetailCreate):
    db_order_detail = db.query(models.OrderDetail).filter(
        models.OrderDetail.order_detail_id == order_detail_id
    ).first()

    if db_order_detail:
        db_order_detail.order_id = order_detail.order_id
        db_order_detail.product_id = order_detail.product_id
        db_order_detail.quantity = order_detail.quantity
        db_order_detail.price = order_detail.price

        db.commit()
        db.refresh(db_order_detail)

    return db_order_detail


def delete_order_detail(db: Session, order_detail_id: int):
    db_order_detail = db.query(models.OrderDetail).filter(
        models.OrderDetail.order_detail_id == order_detail_id
    ).first()

    if db_order_detail:
        db.delete(db_order_detail)
        db.commit()

    return db_order_detail
# -----------------------------
# Payment CRUD
# -----------------------------

def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(
        order_id=payment.order_id,
        payment_method=payment.payment_method,
        payment_status=payment.payment_status,
        amount=payment.amount
    )

    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment


def get_payments(db: Session):
    return db.query(models.Payment).all()


def get_payment(db: Session, payment_id: int):
    return db.query(models.Payment).filter(
        models.Payment.payment_id == payment_id
    ).first()


def update_payment(db: Session, payment_id: int, payment: schemas.PaymentCreate):
    db_payment = db.query(models.Payment).filter(
        models.Payment.payment_id == payment_id
    ).first()

    if db_payment:
        db_payment.order_id = payment.order_id
        db_payment.payment_method = payment.payment_method
        db_payment.payment_status = payment.payment_status
        db_payment.amount = payment.amount

        db.commit()
        db.refresh(db_payment)

    return db_payment


def delete_payment(db: Session, payment_id: int):
    db_payment = db.query(models.Payment).filter(
        models.Payment.payment_id == payment_id
    ).first()

    if db_payment:
        db.delete(db_payment)
        db.commit()

    return db_payment
# -----------------------------
# Wishlist CRUD
# -----------------------------

def create_wishlist(db: Session, wishlist: schemas.WishlistCreate):

    db_wishlist = models.Wishlist(
        user_id=wishlist.user_id,
        product_id=wishlist.product_id
    )

    db.add(db_wishlist)
    db.commit()
    db.refresh(db_wishlist)

    return db_wishlist



def get_wishlist(db: Session):

    return db.query(models.Wishlist).all()



# -----------------------------
# Reviews CRUD
# -----------------------------

def create_review(db: Session, review: schemas.ReviewCreate):

    db_review = models.Review(
        user_id=review.user_id,
        product_id=review.product_id,
        rating=review.rating,
        comment=review.comment
    )

    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    return db_review



def get_reviews(db: Session):

    return db.query(models.Review).all()
def get_dashboard_stats(db: Session):

    return {
        "products": db.query(models.Product).count(),
        "users": db.query(models.User).count(),
        "orders": db.query(models.Order).count(),
        "payments": db.query(models.Payment).count(),
        "revenue": sum(
            payment.amount
            for payment in db.query(models.Payment).all()
        )
    }
def create_order_details_from_cart(db: Session, order_id: int, user_id: int):

    cart_items = (
        db.query(models.Cart)
        .filter(models.Cart.user_id == user_id)
        .all()
    )

    for item in cart_items:

        product = (
            db.query(models.Product)
            .filter(models.Product.product_id == item.product_id)
            .first()
        )

        if product:

            detail = models.OrderDetail(
                order_id=order_id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=product.price
            )

            db.add(detail)

            # Reduce stock
            product.stock -= item.quantity

            # Remove from cart
            db.delete(item)

    db.commit()

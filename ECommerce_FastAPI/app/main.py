from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models
from app import auth

from app.routers import users
from app.routers import categories
from app.routers import suppliers
from app.routers import products
from app.routers import cart
from app.routers import orders
from app.routers import order_details
from app.routers import payment
from app.routers import wishlist
from app.routers import reviews
from app.routers import dashboard

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="E-Commerce API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded images
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# Include routers
app.include_router(users.router)
app.include_router(categories.router)
app.include_router(suppliers.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(order_details.router)
app.include_router(payment.router)
app.include_router(auth.router)
app.include_router(wishlist.router)
app.include_router(reviews.router)
app.include_router(dashboard.router)

# Home Route
@app.get("/")
def home():
    return {
        "message": "Welcome to E-Commerce FastAPI Project"
    }
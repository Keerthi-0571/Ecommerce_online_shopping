# 🛒 E-Commerce FastAPI Backend

A RESTful E-Commerce Backend API built using **FastAPI**, **MySQL**, **SQLAlchemy**, and **JWT Authentication**. This project provides secure APIs for managing users, products, categories, suppliers, carts, orders, and payments.

---

## 🚀 Features

- User Registration & Login
- JWT Authentication
- Role-Based Authorization (Admin/User)
- Product Management
- Category Management
- Supplier Management
- Shopping Cart
- Order Management
- Order Details
- Payment API
- MySQL Database
- Interactive Swagger Documentation

---

## 🛠️ Tech Stack

- FastAPI
- Python
- MySQL
- SQLAlchemy ORM
- Pydantic
- JWT Authentication
- Uvicorn

---

## 📂 Project Structure

```
ECommerce_FastAPI/
│── app/
│   ├── routers/
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
│   ├── oauth2.py
│   ├── auth.py
│   ├── utils.py
│   └── main.py
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

## 📌 API Modules

- Users
- Authentication
- Categories
- Suppliers
- Products
- Cart
- Orders
- Order Details
- Payments

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Keerthi-0571/ECommerce_FastAPI.git
```

### Navigate to the project

```bash
cd ECommerce_FastAPI
```

### Create a virtual environment

```bash
python -m venv venv
```

### Activate the virtual environment

**Windows**

```bash
venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run the application

```bash
uvicorn app.main:app --reload
```

---

## 📖 API Documentation

After running the project, open:

Swagger UI

```
http://127.0.0.1:8000/docs
```

Redoc

```
http://127.0.0.1:8000/redoc
```

---

## 🔐 Authentication

The project uses **JWT (JSON Web Token)** authentication.

1. Register a new user.
2. Login to receive an access token.
3. Use the token in the `Authorization` header:

```
Bearer <your_access_token>
```

---

## 📸 Sample API Endpoints

| Method | Endpoint |
|---------|----------|
| POST | /users |
| POST | /login |
| GET | /products |
| POST | /products |
| GET | /categories |
| POST | /orders |
| GET | /cart |
| POST | /payment |

---

## 👨‍💻 Author

**Keerthi Yadav**

GitHub: https://github.com/Keerthi-0571

---

## ⭐ Future Improvements

- Wishlist
- Product Reviews & Ratings
- Search & Filtering
- Pagination
- Product Images
- Email Notifications
- Deployment
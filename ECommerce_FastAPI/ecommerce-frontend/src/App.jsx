import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import EditProduct from "./pages/EditProduct";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";

function AppContent() {

  const location = useLocation();

  // Hide navbar on login page
  const hideNavbar = location.pathname === "/";

  return (
    <>

      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/add-product" element={<AddProduct />} />

        <Route path="/edit-product/:id" element={<EditProduct />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/payments" element={<Payment />} />

        <Route path="/payment-history" element={<PaymentHistory />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/order-details/:id" element={<OrderDetails />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </>
  );
}

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );

}

export default App;
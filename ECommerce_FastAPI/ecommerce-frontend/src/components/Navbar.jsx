import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        alert("Logged Out Successfully");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/dashboard">
                    🛒 E-Commerce
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/products">
                        Products
                    </Link>

                    <Link className="nav-link" to="/cart">
                        Cart
                    </Link>

                    <Link className="nav-link" to="/wishlist">
                        Wishlist
                    </Link>

                    <Link className="nav-link" to="/orders">
                        Orders
                    </Link>

                    <Link className="nav-link" to="/payment-history">
                        Payments
                    </Link>
                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>
                    <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;
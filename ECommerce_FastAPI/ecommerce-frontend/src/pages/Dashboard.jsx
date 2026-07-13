import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Dashboard() {

    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        payments: 0,
        revenue: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/dashboard/");
            setStats(res.data);
        } catch (err) {
            console.log(err);
            alert("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h4>Loading Dashboard...</h4>
            </div>
        );
    }

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center">
                E-Commerce Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-primary h-100 shadow">
                        <div className="card-body text-center">
                            <h5>Total Products</h5>
                            <h2>{stats.products}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-success h-100 shadow">
                        <div className="card-body text-center">
                            <h5>Total Orders</h5>
                            <h2>{stats.orders}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card text-dark bg-warning h-100 shadow">
                        <div className="card-body text-center">
                            <h5>Total Users</h5>
                            <h2>{stats.users}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-danger h-100 shadow">
                        <div className="card-body text-center">
                            <h5>Total Payments</h5>
                            <h2>{stats.payments}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-dark h-100 shadow">
                        <div className="card-body text-center">
                            <h5>Total Revenue</h5>
                            <h2>₹ {Number(stats.revenue).toFixed(2)}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <h4 className="mb-3">Quick Actions</h4>

            <Link to="/products">
                <button className="btn btn-primary me-2 mb-2">
                    Products
                </button>
            </Link>

            <Link to="/orders">
                <button className="btn btn-success me-2 mb-2">
                    Orders
                </button>
            </Link>

            <Link to="/payment-history">
                <button className="btn btn-warning me-2 mb-2">
                    Payments
                </button>
            </Link>

            <Link to="/wishlist">
                <button className="btn btn-danger mb-2">
                    Wishlist
                </button>
            </Link>

        </div>
    );
}

export default Dashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const res = await API.get("/orders/");

            console.log("Orders:", res.data);

            setOrders(res.data);
        } catch (err) {
            console.log(err);

            alert("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const viewDetails = (orderId) => {
        navigate(`/order-details/${orderId}`);
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return (
                    <span className="badge bg-success">
                        Completed
                    </span>
                );

            case "pending":
                return (
                    <span className="badge bg-warning text-dark">
                        Pending
                    </span>
                );

            case "cancelled":
                return (
                    <span className="badge bg-danger">
                        Cancelled
                    </span>
                );

            default:
                return (
                    <span className="badge bg-secondary">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>My Orders</h2>

                <button
                    className="btn btn-primary"
                    onClick={fetchOrders}
                >
                    Refresh
                </button>

            </div>

            {loading ? (

                <div className="text-center">
                    Loading...
                </div>

            ) : orders.length === 0 ? (

                <div className="alert alert-info">
                    No Orders Found
                </div>

            ) : (

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr key={order.order_id}>

                                <td>{order.order_id}</td>

                                <td>{order.user_id}</td>

                                <td>
                                    {new Date(
                                        order.order_date
                                    ).toLocaleString()}
                                </td>

                                <td>
                                    ₹{Number(order.total_amount).toFixed(2)}
                                </td>

                                <td>
                                    {getStatusBadge(order.status)}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() =>
                                            viewDetails(order.order_id)
                                        }
                                    >
                                        View Details
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default Orders;
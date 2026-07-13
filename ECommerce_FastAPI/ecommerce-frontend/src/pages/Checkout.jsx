import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";

function Checkout() {

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const [order, setOrder] = useState({
        user_id: user ? user.user_id : "",
        total_amount: location.state?.amount || 0,
        status: "Pending"
    });

    const [loading, setLoading] = useState(false);

    const placeOrder = async (e) => {

        e.preventDefault();

        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {

            const response = await API.post("/orders/", {
                user_id: order.user_id,
                total_amount: Number(order.total_amount),
                status: order.status
            });

            alert("Order Placed Successfully ✅");

            navigate("/payments", {
                state: {
                    order_id: response.data.order_id,
                    amount: response.data.total_amount
                }
            });

        } catch (err) {

            console.log(err);
            alert("Failed to Place Order");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow mx-auto"
                style={{ maxWidth: "600px" }}
            >

                <div className="card-header bg-success text-white">

                    <h3 className="mb-0">
                        Checkout
                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={placeOrder}>

                        <div className="mb-3">

                            <label className="form-label">
                                Customer
                            </label>

                            <input
                                className="form-control"
                                value={user ? user.name : ""}
                                readOnly
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                className="form-control"
                                value={user ? user.email : ""}
                                readOnly
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Total Amount
                            </label>

                            <input
                                className="form-control"
                                value={`₹ ${order.total_amount}`}
                                readOnly
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Order Status
                            </label>

                            <select
                                className="form-select"
                                name="status"
                                value={order.status}
                                onChange={(e) =>
                                    setOrder({
                                        ...order,
                                        status: e.target.value
                                    })
                                }
                            >

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                            </select>

                        </div>

                        <button
                            className="btn btn-success w-100"
                            disabled={loading}
                        >

                            {loading
                                ? "Placing Order..."
                                : "Place Order"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Checkout;
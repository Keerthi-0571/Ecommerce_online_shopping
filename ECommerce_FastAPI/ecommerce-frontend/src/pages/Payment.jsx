import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";

function Payment() {

    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);

    const [payment, setPayment] = useState({
        order_id: "",
        payment_method: "UPI",
        payment_status: "Success",
        amount: ""
    });

    useEffect(() => {

        if (!location.state) {
            alert("No Order Found");
            navigate("/checkout");
            return;
        }

        setPayment({
            order_id: location.state.order_id,
            payment_method: "UPI",
            payment_status: "Success",
            amount: location.state.amount
        });

    }, [location.state, navigate]);

    const handleChange = (e) => {

        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });

    };

    const makePayment = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await API.post("/payments/", {

                order_id: Number(payment.order_id),

                payment_method: payment.payment_method,

                payment_status: payment.payment_status,

                amount: Number(payment.amount)

            });

            alert("Payment Successful ✅");

            navigate("/orders");

        } catch (err) {

            console.log(err);

            alert("Payment Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow mx-auto"
                style={{ maxWidth: "550px" }}
            >

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">
                        Payment
                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={makePayment}>

                        <div className="mb-3">

                            <label className="form-label">
                                Order ID
                            </label>

                            <input
                                className="form-control"
                                value={payment.order_id}
                                readOnly
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Amount
                            </label>

                            <input
                                className="form-control"
                                value={`₹ ${payment.amount}`}
                                readOnly
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Payment Method
                            </label>

                            <select
                                className="form-select"
                                name="payment_method"
                                value={payment.payment_method}
                                onChange={handleChange}
                            >

                                <option value="UPI">
                                    UPI
                                </option>

                                <option value="Credit Card">
                                    Credit Card
                                </option>

                                <option value="Debit Card">
                                    Debit Card
                                </option>

                                <option value="Cash On Delivery">
                                    Cash On Delivery
                                </option>

                            </select>

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Payment Status
                            </label>

                            <select
                                className="form-select"
                                name="payment_status"
                                value={payment.payment_status}
                                onChange={handleChange}
                            >

                                <option value="Success">
                                    Success
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Failed">
                                    Failed
                                </option>

                            </select>

                        </div>

                        <button
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >

                            {loading ? "Processing..." : "Pay Now"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Payment;
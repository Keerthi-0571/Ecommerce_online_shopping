import { useEffect, useState } from "react";
import API from "../api/api";

function PaymentHistory() {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {

        try {

            setLoading(true);

            const response = await API.get("/payments/");

            console.log("Payment Data:", response.data);

            setPayments(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load payment history.");

        } finally {

            setLoading(false);

        }

    };

    const getStatusBadge = (status) => {

        switch (status.toLowerCase()) {

            case "success":
                return (
                    <span className="badge bg-success">
                        Success
                    </span>
                );

            case "pending":
                return (
                    <span className="badge bg-warning text-dark">
                        Pending
                    </span>
                );

            case "failed":
                return (
                    <span className="badge bg-danger">
                        Failed
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

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <h4>Loading Payment History...</h4>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Payment History</h2>

                <button
                    className="btn btn-primary"
                    onClick={fetchPayments}
                >
                    Refresh
                </button>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Payment ID</th>
                        <th>Order ID</th>
                        <th>Payment Method</th>
                        <th>Amount</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {payments.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >

                                No Payments Found

                            </td>

                        </tr>

                    ) : (

                        payments.map((payment) => (

                            <tr key={payment.payment_id}>

                                <td>{payment.payment_id}</td>

                                <td>{payment.order_id}</td>

                                <td>{payment.payment_method}</td>

                                <td>
                                    ₹{Number(payment.amount).toFixed(2)}
                                </td>

                                <td>
                                    {getStatusBadge(payment.payment_status)}
                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default PaymentHistory;
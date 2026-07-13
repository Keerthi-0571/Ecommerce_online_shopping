import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function OrderDetails() {

    const { id } = useParams();

    const [details, setDetails] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            setLoading(true);

            const [detailRes, productRes] = await Promise.all([
                API.get("/order-details/"),
                API.get("/products/")
            ]);

            const filtered = detailRes.data.filter(
                item => item.order_id === Number(id)
            );

            setDetails(filtered);
            setProducts(productRes.data);

        } catch (error) {

            console.log(error);
            alert("Failed to load order details");

        } finally {

            setLoading(false);

        }

    };

    const getProduct = (productId) => {

        return products.find(
            product => product.product_id === productId
        );

    };

    const grandTotal = details.reduce((total, item) => {

        return total + Number(item.price) * Number(item.quantity);

    }, 0);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                Loading...
            </div>
        );
    }

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Order Details
            </h2>

            <div className="card p-3 mb-4">

                <h5>
                    Order ID : {id}
                </h5>

            </div>

            {details.length === 0 ? (

                <div className="alert alert-warning">
                    No Order Details Found
                </div>

            ) : (

                <>
                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>

                            </tr>

                        </thead>

                        <tbody>

                            {details.map((item) => {

                                const product = getProduct(item.product_id);

                                return (

                                    <tr key={item.order_detail_id}>

                                        <td>

                                            {product?.image ? (

                                                <img
                                                    src={`http://127.0.0.1:8001/uploads/${product.image}`}
                                                    alt={product.product_name}
                                                    width="80"
                                                    height="80"
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "8px"
                                                    }}
                                                />

                                            ) : (

                                                "No Image"

                                            )}

                                        </td>

                                        <td>

                                            {product
                                                ? product.product_name
                                                : "Unknown Product"}

                                        </td>

                                        <td>

                                            ₹{item.price}

                                        </td>

                                        <td>

                                            {item.quantity}

                                        </td>

                                        <td>

                                            ₹{Number(item.price) * Number(item.quantity)}

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                    <div className="text-end">

                        <h3>

                            Grand Total :
                            ₹{grandTotal.toFixed(2)}

                        </h3>

                    </div>

                </>

            )}

        </div>

    );

}

export default OrderDetails;
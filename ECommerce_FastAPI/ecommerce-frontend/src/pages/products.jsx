import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/products/");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
            alert("Failed to load products");
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            await API.delete(`/products/${id}`);
            alert("Product Deleted Successfully");
            fetchProducts();
        } catch (err) {
            console.log(err);
            alert("Delete Failed");
        }
    };

    const addToCart = async (productId) => {
        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            await API.post("/cart/", {
                user_id: user.user_id,
                product_id: productId,
                quantity: 1
            });

            alert("Product Added To Cart");
        } catch (err) {
            console.log(err);
            alert("Failed To Add Cart");
        }
    };

    const addToWishlist = async (productId) => {
        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            await API.post("/wishlist/", {
                user_id: user.user_id,
                product_id: productId
            });

            alert("Added To Wishlist ❤️");
        } catch (err) {
            console.log(err);
            alert("Failed To Add Wishlist");
        }
    };

    const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products</h2>

                <div>
                    <Link to="/add-product">
                        <button className="btn btn-success me-2">
                            Add Product
                        </button>
                    </Link>

                    <button
                        className="btn btn-primary"
                        onClick={fetchProducts}
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <div className="row mb-4">

                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-md-6 text-end">
                    <h5>Total Products : {filteredProducts.length}</h5>
                </div>

            </div>

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th width="350">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredProducts.length === 0 ? (

                        <tr>
                            <td colSpan="8" className="text-center">
                                No Products Found
                            </td>
                        </tr>

                    ) : (

                        filteredProducts.map((product) => (

                            <tr key={product.product_id}>

                                <td>{product.product_id}</td>

                                <td>

                                    {product.image ? (

                                        <img
                                            src={`http://127.0.0.1:8001/uploads/${product.image}`}
                                            alt={product.product_name}
                                            width="80"
                                            height="80"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "10px"
                                            }}
                                        />

                                    ) : (

                                        <img
                                            src="https://via.placeholder.com/80"
                                            alt="No Image"
                                            width="80"
                                            height="80"
                                        />

                                    )}

                                </td>

                                <td>{product.product_name}</td>

                                <td>{product.description}</td>

                                <td>₹ {product.price}</td>

                                <td>{product.stock}</td>

                                <td>

                                    {product.stock > 10 ? (
                                        <span className="badge bg-success">
                                            In Stock
                                        </span>
                                    ) : product.stock > 0 ? (
                                        <span className="badge bg-warning text-dark">
                                            Low Stock
                                        </span>
                                    ) : (
                                        <span className="badge bg-danger">
                                            Out of Stock
                                        </span>
                                    )}

                                </td>

                                <td>

                                    <Link to={`/edit-product/${product.product_id}`}>
                                        <button className="btn btn-warning btn-sm me-2">
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() =>
                                            deleteProduct(product.product_id)
                                        }
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        disabled={product.stock === 0}
                                        onClick={() =>
                                            addToCart(product.product_id)
                                        }
                                    >
                                        Add Cart
                                    </button>

                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() =>
                                            addToWishlist(product.product_id)
                                        }
                                    >
                                        ❤️ Wishlist
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default Products;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        supplier_id: ""
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {

        try {

            const res = await API.get(`/products/${id}`);

            setProduct({
                product_name: res.data.product_name,
                description: res.data.description,
                price: res.data.price,
                stock: res.data.stock,
                category_id: res.data.category_id,
                supplier_id: res.data.supplier_id,
                image: res.data.image
            });

        } catch (err) {

            console.log(err);
            alert("Unable to load product");

        }

    };

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

    };

    const handleImage = (e) => {

        setImage(e.target.files[0]);

    };

    const updateProduct = async (e) => {

        e.preventDefault();

        try {

            const productData = {

                product_name: product.product_name,
                description: product.description,
                price: Number(product.price),
                stock: Number(product.stock),
                category_id: Number(product.category_id),
                supplier_id: Number(product.supplier_id)

            };

            const formData = new FormData();

            formData.append(
                "product",
                JSON.stringify(productData)
            );

            if (image) {

                formData.append(
                    "image",
                    image
                );

            }

            await API.put(
                `/products/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("✅ Product Updated Successfully");

            navigate("/products");

        } catch (err) {

            console.log(err);

            alert("Update Failed");

        }

    };

    return (

        <div
            className="container mt-5"
            style={{ maxWidth: "600px" }}
        >

            <h2 className="mb-4">
                Edit Product
            </h2>

            <form onSubmit={updateProduct}>

                <input
                    className="form-control mb-3"
                    name="product_name"
                    value={product.product_name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    required
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="category_id"
                    value={product.category_id}
                    onChange={handleChange}
                    placeholder="Category ID"
                    required
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="supplier_id"
                    value={product.supplier_id}
                    onChange={handleChange}
                    placeholder="Supplier ID"
                    required
                />

                {product.image && (

                    <div className="mb-3 text-center">

                        <img
                            src={`http://127.0.0.1:8001/uploads/${product.image}`}
                            alt="Product"
                            width="180"
                            className="img-thumbnail"
                        />

                    </div>

                )}

                <input
                    className="form-control mb-4"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                />

                <button
                    className="btn btn-primary w-100"
                >
                    Update Product
                </button>

            </form>

        </div>

    );

}

export default EditProduct;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    supplier_id: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "product",
        JSON.stringify({
          product_name: product.product_name,
          description: product.description,
          price: Number(product.price),
          stock: Number(product.stock),
          category_id: Number(product.category_id),
          supplier_id: Number(product.supplier_id),
        })
      );

      if (image) {
        formData.append("image", image);
      }

      const response = await API.post("/products/", formData);

      console.log("Product Added:", response.data);

      alert("✅ Product Added Successfully");

      setProduct({
        product_name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        supplier_id: "",
      });

      setImage(null);

      navigate("/products");
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
        alert(JSON.stringify(err.response.data));
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={product.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            name="category_id"
            placeholder="Category ID"
            value={product.category_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            name="supplier_id"
            placeholder="Supplier ID"
            value={product.supplier_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Product Image</label>

          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button className="btn btn-success w-100" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
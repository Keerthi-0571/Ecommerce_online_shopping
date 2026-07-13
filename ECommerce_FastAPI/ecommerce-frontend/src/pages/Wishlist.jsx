import { useEffect, useState } from "react";
import API from "../api/api";


function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    const [products, setProducts] = useState([]);



    useEffect(() => {

        fetchWishlist();

        fetchProducts();

    }, []);




    const fetchWishlist = async () => {

        try {

            const response = await API.get("/wishlist/");

            console.log(
                "Wishlist:",
                response.data
            );

            setWishlist(response.data);


        } catch(error) {

            console.log(error);

        }

    };




    const fetchProducts = async () => {

        try {

            const response = await API.get("/products");

            setProducts(response.data);


        } catch(error) {

            console.log(error);

        }

    };




    const removeWishlist = async(id) => {

        try {

            await API.delete(
                `/wishlist/${id}`
            );


            alert("Removed from Wishlist ❤️");


            fetchWishlist();


        } catch(error) {

            console.log(error);

        }

    };





    return (

        <div className="container mt-5">


            <h2>
                My Wishlist ❤️
            </h2>



            {
                wishlist.length === 0 ? (

                    <h5>
                        Wishlist is empty
                    </h5>

                ) : (


                    wishlist.map((item)=>(


                        <div

                            className="card p-3 mb-3"

                            key={item.wishlist_id}

                        >


                            {
                                products.map((product)=>{


                                    if(
                                        product.product_id === item.product_id
                                    ){

                                        return (

                                            <div key={product.product_id}>


                                                <h4>
                                                    {product.product_name}
                                                </h4>


                                                <p>
                                                    Price:
                                                    ₹{product.price}
                                                </p>


                                                <p>
                                                    Stock:
                                                    {product.stock}
                                                </p>


                                            </div>

                                        );

                                    }


                                    return null;


                                })

                            }



                            <button

                                className="btn btn-danger"

                                onClick={() =>
                                    removeWishlist(
                                        item.wishlist_id
                                    )
                                }

                            >

                                Remove

                            </button>



                        </div>


                    ))

                )
            }



        </div>

    );

}


export default Wishlist;
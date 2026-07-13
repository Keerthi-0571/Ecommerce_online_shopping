import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";


function Cart() {


    const [cart,setCart] = useState([]);

    const [products,setProducts] = useState([]);


    const navigate = useNavigate();



    const user = JSON.parse(
        localStorage.getItem("user")
    );



    useEffect(()=>{


        if(!user){

            alert(
                "User not logged in"
            );

            navigate("/login");

            return;

        }


        loadCart();


    },[]);





    const loadCart = async()=>{


        try{


            const cartResponse =
            await API.get("/cart/");



            const productResponse =
            await API.get("/products/");



            console.log(
                "Cart:",
                cartResponse.data
            );



            const userCart =
            cartResponse.data.filter(
                item =>
                item.user_id === user.user_id
            );



            console.log(
                "My Cart:",
                userCart
            );



            setCart(userCart);


            setProducts(
                productResponse.data
            );


        }
        catch(error){


            console.log(
                "Cart Error:",
                error
            );


        }


    };







    const getProduct=(id)=>{


        return products.find(

            product =>
            product.product_id === id

        );


    };







    const removeCartItem=async(id)=>{


        try{


            await API.delete(
                `/cart/${id}`
            );


            alert(
                "Removed"
            );


            loadCart();



        }
        catch(error){


            console.log(error);


        }


    };







    const updateQuantity=async(item,qty)=>{


        try{


            await API.put(

                `/cart/${item.cart_id}`,

                {

                    user_id:item.user_id,

                    product_id:item.product_id,

                    quantity:qty

                }

            );


            loadCart();


        }
        catch(error){

            console.log(error);

        }


    };







    const totalAmount = cart.reduce(

        (total,item)=>{


            const product =
            getProduct(item.product_id);



            if(product){

                return total +
                Number(product.price)
                *
                Number(item.quantity);

            }


            return total;


        },

        0

    );







    return (

        <div className="container mt-5">


            <h2>
                Shopping Cart 🛒
            </h2>




            <table className="table table-bordered mt-4">


            <thead className="table-dark">

                <tr>

                    <th>
                        Product
                    </th>

                    <th>
                        Price
                    </th>

                    <th>
                        Quantity
                    </th>

                    <th>
                        Total
                    </th>

                    <th>
                        Action
                    </th>

                </tr>

            </thead>





            <tbody>



            {
                cart.length===0 ?

                (

                <tr>

                    <td
                    colSpan="5"
                    className="text-center"
                    >

                        Cart Empty

                    </td>

                </tr>


                )

                :

                cart.map(item=>{


                    const product =
                    getProduct(
                        item.product_id
                    );



                    return (

                    <tr key={item.cart_id}>


                        <td>

                            {
                                product
                                ?
                                product.product_name
                                :
                                "Loading..."
                            }

                        </td>




                        <td>

                            ₹
                            {
                                product?.price
                            }

                        </td>





                        <td>


                            <button

                            className="btn btn-danger btn-sm"

                            onClick={()=>{

                                if(item.quantity>1)

                                updateQuantity(
                                    item,
                                    item.quantity-1
                                )

                            }}

                            >

                                -

                            </button>



                            <span className="mx-3">

                                {item.quantity}

                            </span>




                            <button

                            className="btn btn-success btn-sm"

                            onClick={()=>updateQuantity(
                                item,
                                item.quantity+1
                            )}

                            >

                                +

                            </button>


                        </td>





                        <td>

                            ₹
                            {
                                product
                                ?
                                product.price *
                                item.quantity
                                :
                                0
                            }

                        </td>





                        <td>


                            <button

                            className="btn btn-danger btn-sm"

                            onClick={()=>
                                removeCartItem(
                                    item.cart_id
                                )
                            }

                            >

                                Remove

                            </button>


                        </td>



                    </tr>

                    );


                })

            }



            </tbody>


            </table>






            <div className="text-end">


                <h3>

                    Total :
                    ₹{totalAmount}

                </h3>



                <button

                className="btn btn-success"

                disabled={
                    totalAmount===0
                }

                onClick={()=>navigate(
                    "/checkout",
                    {
                        state:{
                            amount:totalAmount
                        }
                    }
                )}

                >

                    Proceed Checkout

                </button>


            </div>



        </div>


    );

}


export default Cart;
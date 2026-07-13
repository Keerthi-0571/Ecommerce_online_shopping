import { useEffect, useState } from "react";
import API from "../api/api";


function Profile() {

    const [user, setUser] = useState(null);


    useEffect(() => {

        fetchProfile();

    }, []);



    const fetchProfile = async () => {

        try {


            const userId = localStorage.getItem("user_id");


            if (!userId) {

                alert("User not logged in");

                return;

            }



            const response = await API.get(
                `/users/${userId}`
            );


            console.log(
                "Profile Data:",
                response.data
            );


            setUser(response.data);



        } catch(error) {


            console.log(
                "Profile Error:",
                error
            );


            alert(
                "Failed to load profile"
            );


        }

    };




    if (!user) {

        return (

            <h3 className="text-center mt-5">

                Loading Profile...

            </h3>

        );

    }




    return (

        <div 
            className="container mt-5"
            style={{maxWidth:"600px"}}
        >


            <div className="card shadow">


                <div className="card-header bg-primary text-white">

                    <h3>
                        User Profile
                    </h3>

                </div>



                <div className="card-body">


                    <h5>
                        Name :
                        {" "}
                        {user.name}
                    </h5>

                    <hr />


                    <h5>
                        Email :
                        {" "}
                        {user.email}
                    </h5>

                    <hr />


                    <h5>
                        Phone :
                        {" "}
                        {user.phone}
                    </h5>

                    <hr />


                    <h5>
                        Address :
                        {" "}
                        {user.address}
                    </h5>

                    <hr />


                    <h5>
                        Role :
                        {" "}
                        {user.role}
                    </h5>



                </div>


            </div>


        </div>


    );

}


export default Profile;
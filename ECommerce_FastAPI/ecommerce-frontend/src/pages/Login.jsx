import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    console.log("========== LOGIN START ==========");
    console.log("Email:", email);
    console.log("Password:", password);

    try {

      const formData = new URLSearchParams();

formData.append("username", email);
formData.append("password", password);


const response = await API.post(
    "/login",
    formData,
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);


      // Check JWT token
      if (response.data.access_token) {

    // Save JWT token
    localStorage.setItem(
        "token",
        response.data.access_token
    );


    // Fetch logged-in user details
    const userResponse = await API.get(
        "/users/"
    );


    const loggedUser = userResponse.data.find(
        user => user.email === email
    );


    if(loggedUser){

        localStorage.setItem(
            "user",
            JSON.stringify(loggedUser)
        );

        console.log(
            "Logged User:",
            loggedUser
        );

    }


    alert("Login Successful");


    navigate("/dashboard");

}
      else {

        console.log("No token received");

        alert("Login failed: Token not received");

      }


    } catch (err) {


      console.log("========== LOGIN ERROR ==========");


      if (err.response) {


        console.log("Status:", err.response.status);

        console.log(
          "Backend Error:",
          err.response.data
        );


        // Handle FastAPI validation errors
        if (Array.isArray(err.response.data.detail)) {


          const errorMessage =
            err.response.data.detail
              .map((error) => error.msg)
              .join("\n");


          alert(errorMessage);


        } 
        
        else {


          alert(
            err.response.data.detail || 
            "Login failed"
          );


        }


      } 
      else {


        console.log("Network Error:", err);

        alert("Server not reachable");


      }

    }

  };


  return (

    <div 
      className="container mt-5" 
      style={{ maxWidth: "400px" }}
    >

      <h2 className="text-center mb-4">
        Login
      </h2>


      <form onSubmit={loginUser}>


        <div className="mb-3">

          <input

            type="email"

            className="form-control"

            placeholder="Enter Email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            required

          />

        </div>



        <div className="mb-3">

          <input

            type="password"

            className="form-control"

            placeholder="Enter Password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

            required

          />

        </div>



        <button

          type="submit"

          className="btn btn-primary w-100"

        >

          Login

        </button>


      </form>


    </div>

  );

}


export default Login;
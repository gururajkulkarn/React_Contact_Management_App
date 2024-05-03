import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AdminCreate() {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const apiBaseUrl = import.meta.env.VITE_Contact_Management_Api_Base_Url;

  // Function to add token to headers
  const addTokenToHeaders = () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Handle case when token is not available in local storage
      console.error("Token not found in local storage");
    }
  };

  const handleSubmit = (event) => {
    addTokenToHeaders();
    event.preventDefault();
    axios
      .post(`${apiBaseUrl}/api/auth/admin/signup`, data)
      .then((response) => {
        console.log(response.data.message);
        const successMessage = "Admin created successfully...";
        if (
          !response ||
          (response.status !== 400 &&
            response.data.message !== "Username is already taken!" &&
            response.data.message !== "Email is already taken!")
        ) {
          toast.success(successMessage);
          // Optionally, you can show a success message or redirect to another page
          setData({
            name: "",
            username: "",
            email: "",
            password: "",
          });
        } else {
          // Show error message in an alert to the user
          alert(response.data.message + ". Please try again.");
        }
      })
      .catch((error) => {
        // Other errors
        console.error("Error creating admin user:", error);
      });
  };

  return (
    <>
      <main className="main-container">
        <h2 style={{ color: "green" }}>Create Admin</h2>

        <form onSubmit={handleSubmit}>
          <div className="main-title">
            <div className="row">
              <div className="col-lg-12">
                <input
                  className="form-control-lg m-2"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />

                <input
                  className="form-control-lg m-2"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-lg-12">
                <input
                  className="form-control-lg m-2"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
                <input
                  className="form-control-lg m-2"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-lg-12">
                <button type="submit" className="btn btn-primary w-25 m-2 ">
                  Create
                </button>
                {error && <p>{error}</p>}
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default AdminCreate;

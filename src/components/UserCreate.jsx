import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UserCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    addTokenToHeaders();
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/api/auth/signup",
        formData
      );

      console.log(response.data); // Handle response accordingly
      const successMessage = "User created successfully...";
      if (
        !response ||
        (response.status !== 400 &&
          response.data.message !== "Username is already taken!" &&
          response.data.message !== "Email is already taken!")
      ) {
        toast.success(successMessage);
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
        });
      } else {
        // Show error message in an alert to the user
        alert(response.data.message + ". Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="main-container">
        <h2 style={{ color: "green" }}>Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="main-title">
            <div className="row">
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control-lg m-2"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />

                <input
                  type="text"
                  className="form-control-lg m-2"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>

              <div className="col-lg-12">
                <input
                  type="email"
                  className="form-control-lg m-2"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />

                <input
                  type="password"
                  className="form-control-lg m-2"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="col-lg-12">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default UserCreate;

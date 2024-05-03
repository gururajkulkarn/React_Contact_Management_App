import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/auth/signIn",
        {
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        }
      );

      const { role, accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);

      if (role === "ROLE_SUPER_ADMIN") {
        navigate("/superadminDashb");
      } else if (role === "ROLE_ADMIN") {
        navigate("/adminhome");
      } else if (role === "ROLE_USER") {
        navigate("/useradshboard");
      } else {
        navigate("#");
      }
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <main className="form-signin" >
        <form onSubmit={handleLogin}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Email"
              className="form-control-lg"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control-lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-4">
            Login
          </button>
          {error && <p>{error}</p>}
          
        </form>
      </main>
    </>
  );
};

export default Login;

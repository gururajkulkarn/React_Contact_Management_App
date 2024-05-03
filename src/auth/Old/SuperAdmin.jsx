import React, { useState } from "react";
import axios from "axios";

function SuperAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8888/api/auth/signIn", {
        usernameOrEmail: username,
        password: password,
      })
      .then((response) => {
        const { accessToken } = response.data.data;
        localStorage.setItem("token", accessToken);
        // Redirect to dashboard or perform any other action
        window.location.href = "/superadminDashb";
      })
      .catch((error) => {
        setError("Invalid username or password");
        console.error("Error logging in:", error);
      });
  };

  return (
    <>
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="mb-3">
            <input
              className="form-control-lg"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
}

export default SuperAdmin;

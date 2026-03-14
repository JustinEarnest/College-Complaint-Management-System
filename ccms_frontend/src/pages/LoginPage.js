import React, { useState } from "react";
import API from "../services/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const res = await API.post("login/", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access);

      // simple role check
      if (username === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/student";
      }
    } catch (err) {
      if (err.message === "Network Error") {
        setError("Network Error: Unable to connect to backend server. Please ensure the Django backend is running at http://127.0.0.1:8000.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        className="form-control mb-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>

      {error && <div className="text-danger mt-3">{error}</div>}
    </div>
  );
}

export default LoginPage;
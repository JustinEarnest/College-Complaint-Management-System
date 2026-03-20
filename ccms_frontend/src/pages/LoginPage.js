import React, { useState } from "react";

import API from "../services/api";


function LoginPage() {
<<<<<<< HEAD

const [username, setUsername] = useState("");

const [password, setPassword] = useState("");

const [error, setError] = useState("");

const [loading, setLoading] = useState(false);


const handleLogin = async (e) => {

e.preventDefault();

try {

setError("");

setLoading(true);

const res = await API.post("login/", {

username,

password,

});


localStorage.setItem("token", res.data.access);

localStorage.setItem("role", res.data.role);


if (res.data.role === "admin") {

window.location.href = "/admin";

} else {

window.location.href = "/student";

=======
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await API.post("login/", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/student";
      }
    } catch (err) {
      if (err.message === "Network Error") {
        setError(
          "Network Error: Unable to connect to backend server. Please ensure the Django backend is running."
        );
      } else if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Lock Icon */}
        <div className="login-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="login-title">CCMS Login</h1>
        <p className="login-subtitle">College Complaint Management System</p>

        {/* Login Card */}
        <div className="login-card">
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="text"
                  className="form-control"
                  placeholder="your@college.edu"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              id="login-submit"
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="demo-credentials">
          <div className="demo-credentials-title">Demo Credentials</div>
          <p>
            <strong>Admin:</strong> admin@college.edu /{" "}
            <span>admin123</span>
          </p>
          <p>
            <strong>Student:</strong> rahul@college.edu /{" "}
            <span>rahul123</span>
          </p>
        </div>
      </div>
    </div>
  );
>>>>>>> 599eeff (All work done)
}

} catch (err) {

if (err.message === "Network Error") {

setError(

"Network Error: Unable to connect to backend server. Please ensure the Django backend is running."

);

} else if (err.response && err.response.data && err.response.data.error) {

setError(err.response.data.error);

} else {

setError("Login failed. Please check your credentials.");

}

} finally {

setLoading(false);

}

};


return (

<div className="login-wrapper">

<div className="login-container">

{/* Lock Icon */}

<div className="login-icon">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={2}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"

/>

</svg>

</div>


{/* Title */}

<h1 className="login-title">CCMS Login</h1>

<p className="login-subtitle">College Complaint Management System</p>


{/* Login Card */}

<div className="login-card">

{error && <div className="login-error">{error}</div>}


<form onSubmit={handleLogin}>

{/* Email Field */}

<div className="mb-3">

<label className="form-label">Email</label>

<div className="input-group">

<span className="input-icon">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"

/>

</svg>

</span>

<input

id="login-email"

type="text"

className="form-control"

placeholder="your@college.edu"

value={username}

onChange={(e) => setUsername(e.target.value)}

required

/>

</div>

</div>


{/* Password Field */}

<div className="mb-3">

<label className="form-label">Password</label>

<div className="input-group">

<span className="input-icon">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"

/>

</svg>

</span>

<input

id="login-password"

type="password"

className="form-control"

placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"

value={password}

onChange={(e) => setPassword(e.target.value)}

required

/>

</div>

</div>


{/* Sign In Button */}

<button

id="login-submit"

type="submit"

className="login-btn"

disabled={loading}

>

{loading ? "Signing in..." : "Sign In"}

</button>

</form>

</div>


{/* Demo Credentials */}

<div className="demo-credentials">

<div className="demo-credentials-title">Demo Credentials</div>

<p>

<strong>Admin:</strong> admin@college.edu /{" "}

<span>admin123</span>

</p>

<p>

<strong>Student:</strong> rahul@college.edu /{" "}

<span>rahul123</span>

</p>

</div>

</div>

</div>

);

}


export default LoginPage;
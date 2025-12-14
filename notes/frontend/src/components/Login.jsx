import Dashboard from "./Dashboard";
import { useState } from "react";
import showLogo from "../assets/images/icon-show-password.svg";
import hideLogo from "../assets/images/icon-hide-password.svg";

import "./Auth.css";

function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      setIsError(true);
      setMessage("All fields are required");
    }
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();
      if (result.status) {
        // setIsError(false);
        // setMessage(result.message);
        props.setPage("Dashboard");
        window.scrollTo(0, 0); // scroll to top
        // <Dashboard />;
        // return;
      } else {
        setIsError(true);
        setMessage(result.message);
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server error try again later");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" action="" onSubmit={handleSubmit}>
        <div className="form_image">{/* <img src={logo} alt="" /> */}</div>
        <div className="header-info">
          <h3>Welcome to Note</h3>
          <p>Please login to continue</p>
        </div>
        <label>
          Username
          <input
            value={formData.username}
            name="username"
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setMessage(null);
            }}
            // placeholder="username"
          />
        </label>
        <label>
          Password
          <div className="password-wrapper">
            <input
              value={formData.password}
              type={showPassword ? "text" : "password"}
              // className="password"
              name="password"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                });
                setMessage(null);
              }}
            />
            <span
              className="password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? hideLogo : showLogo} alt="" />
            </span>
          </div>
        </label>
        <button className="form-btn" type="submit">
          Log In
        </button>
        <div className="auth-redirect">
          Do not have an account?
          <span
            className="auth-link"
            onClick={() => {
              props.setPage("SignUp");
            }}
          >
            Sign Up
          </span>
        </div>
        {message && (
          <p style={{ color: isError ? "red" : "green" }}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;

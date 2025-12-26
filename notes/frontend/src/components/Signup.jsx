import Login from "./Login";
import { useContext, useState } from "react";

import "./Auth.css";
import logo from "../assets/images/logo.svg";
import showLogo from "../assets/images/icon-show-password.svg";
import hideLogo from "../assets/images/icon-hide-password.svg";
import { NotificationContext } from "./NotificationContext";

function SignUp(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { addNotification } = useContext(NotificationContext);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setIsError(true);
      addNotification("All fields are required", true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setIsError(true);
      addNotification("Passwords do not match", true);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (result.status) {
        // setIsError(false);
        // setMessage(result.message);
        props.setPage("LogIn");
      } else {
        // setIsError(true);
        addNotification(result.message || "Sign Up failed", true);
      }
    } catch (err) {
      // setIsError(true);
      addNotification("Server error. Try again later", true);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form_image">{/* <img src={logo} alt="" /> */}</div>
        <div className="header-info">
          <h3>Create Your Account</h3>
          <p>
            Sign up to start organizing your notes and boost your productivity.
          </p>
        </div>
        <label>
          Username
          <input
            value={formData.username}
            name="username"
            onChange={handleChange}
            // placeholder="username"
            required
          />
        </label>
        <label>
          Email
          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="email@email.com"
            required
          />
        </label>
        <label>
          Password
          <div className="password-wrapper">
            <input
              value={formData.password}
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              // placeholder="password"
              required
            />
            <span
              className="password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? hideLogo : showLogo} alt="" />
            </span>
          </div>
        </label>
        <label>
          Confirm Password
          <div className="password-wrapper">
            <input
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              // placeholder="confirm_password"
              required
            />
            <span
              className="password-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img src={showConfirmPassword ? hideLogo : showLogo} alt="" />
            </span>
          </div>
        </label>
        <button className="form-btn" type="submit">
          Sign Up
        </button>
        {/* {message && ( */}
        {/*   <p style={{ color: isError ? "red" : "green" }}>{message}</p> */}
        {/* )} */}

        <div className="auth-redirect">
          Already have an account?
          <span
            className="auth-link"
            onClick={() => {
              props.setPage("LogIn");
              window.scrollTo(0, 0); // scroll to top
            }}
          >
            Log In
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

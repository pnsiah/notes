import Login from "./Login";
import { useState } from "react";

function SignUp(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      setMessage("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match");
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
        setIsError(true);
        setMessage(result.message || "Sign Up failed");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server error. Try again later");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.username}
        name="username"
        onChange={handleChange}
        placeholder="username"
        required
      />
      <input
        value={formData.email}
        name="email"
        onChange={handleChange}
        placeholder="email"
        required
      />
      <input
        value={formData.password}
        name="password"
        onChange={handleChange}
        type="password"
        placeholder="password"
        required
      />
      <input
        value={formData.confirmPassword}
        name="confirmPassword"
        onChange={handleChange}
        type="password"
        placeholder="confirm_password"
        required
      />
      <button type="submit">Sign Up</button>
      {message && <p style={{ color: isError ? "red" : "green" }}>{message}</p>}

      <div>
        Already have an account?{" "}
        <button
          onClick={() => {
            props.setPage("LogIn");
          }}
        >
          Log In
        </button>
      </div>
    </form>
  );
}

export default SignUp;

import Dashboard from "./Dashboard";
import { useState } from "react";

function Login(props) {
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
      });

      const result = await response.json();
      if (result.status) {
        // setIsError(false);
        // setMessage(result.message);
        props.setPage("Dashboard");
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
    <form action="" onSubmit={handleSubmit}>
      <input
        value={formData.username}
        name="username"
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        placeholder="username"
      />
      <input
        value={formData.password}
        type="password"
        name="password"
        onChange={(e) =>
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          })
        }
        placeholder="password"
      />
      <button type="submit">Log In</button>
      <div>
        Do not have an account?
        <button
          onClick={() => {
            props.setPage("SignUp");
          }}
        >
          Sign Up
        </button>
      </div>
      {message && <p style={{ color: isError ? "red" : "green" }}>{message}</p>}
    </form>
  );
}

export default Login;

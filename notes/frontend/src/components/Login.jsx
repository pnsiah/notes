import { useState } from "react";

function Login(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        value={email}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="password"
      />
      <input
        value={confirm}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="confirm_password"
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
    </form>
  );
}

export default Login;

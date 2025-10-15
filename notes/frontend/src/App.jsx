import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/message/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  return <h1>{message || "Loading..."}</h1>;
}

export default App;

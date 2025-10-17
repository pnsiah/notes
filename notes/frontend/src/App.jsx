import { useEffect, useState } from "react";
import LogIn from "./components/Login";
import SignUp from "./components/Signup.jsx";
// import "./App.css";

function App() {
  const [page, setPage] = useState("LogIn");
  const pages = {
    LogIn: <LogIn setPage={setPage} />,
    SignUp: <SignUp setPage={setPage} />,
  };
  return <div>{pages[page]}</div>;
}

export default App;

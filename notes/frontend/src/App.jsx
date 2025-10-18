import { useEffect, useState } from "react";
import LogIn from "./components/Login";
import Dashboard from "./components/Dashboard.jsx";
import SignUp from "./components/Signup.jsx";
// import "./App.css";

function App() {
  const [page, setPage] = useState("LogIn");
  const pages = {
    LogIn: <LogIn setPage={setPage} />,
    SignUp: <SignUp setPage={setPage} />,
    Dashboard: <Dashboard setPage={setPage} />,
  };
  return <div>{pages[page]}</div>;
}

export default App;

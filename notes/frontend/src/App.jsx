import { useEffect, useState } from "react";
import LogIn from "./components/Login";
import Dashboard from "./components/Dashboard.jsx";
import SignUp from "./components/Signup.jsx";
// import "./App.css";

function App() {
  // ✅ Load the last page from localStorage OR default to LogIn
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [page, setPage] = useState(
    () => localStorage.getItem("page") || "LogIn",
  );

  // ✅ Whenever page changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);
  const pages = {
    LogIn: <LogIn setPage={setPage} />,
    SignUp: <SignUp setPage={setPage} />,
    Dashboard: <Dashboard setPage={setPage} />,
  };
  return <div>{pages[page]}</div>;
}

export default App;

import { useEffect, useState } from "react";
import LogIn from "./components/Login";
import Dashboard from "./components/Dashboard.jsx";
import SignUp from "./components/Signup.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [page, setPage] = useState("LogIn");

  //check if user is logged in
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/auth_status/", {
        credentials: "include",
      });
      const result = await response.json();
      if (result.authenticated) {
        setIsAuthenticated(result.authenticated);
        setPage("Dashboard");
      } else {
        setIsAuthenticated(false);
        setPage("LogIn");
      }
    })();
  }, []);

  // defines which component to render per page
  const pages = {
    LogIn: <LogIn setPage={setPage} />,
    SignUp: <SignUp setPage={setPage} />,
    Dashboard: isAuthenticated ? (
      <Dashboard setPage={setPage} />
    ) : (
      <LogIn setPage={setPage} />
    ),
  };

  if (isAuthenticated === null) return null;

  return <div>{pages[page]}</div>;
}

export default App;

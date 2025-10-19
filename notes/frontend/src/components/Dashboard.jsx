import { useEffect } from "react";

function Dashboard(props) {
  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    const result = await response.json();
    console.log(result);
  };

  // const fetchNotes = async () => {
  //   const response = await fetch("http://localhost:8000/api/notes", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify({}),
  //   });
  //   const result = await response.json();
  //   console.log(result);
  // };

  const handleLogOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to log out");

      const result = await response.json();

      console.log(result);
      props.setPage("LogIn");
    } catch (err) {
      console.log(err);
      alert("Log out failed. Try again");
    }
  };

  useEffect(() => {
    fetchUserData();
  });
  return (
    <div>
      Dashboard lol
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}

export default Dashboard;

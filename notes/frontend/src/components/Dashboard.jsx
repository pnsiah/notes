function Dashboard() {
  const fechUserData = async () => {
    const response = await fetch("http//localhost:8000/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);
  };
  return <div>Dashboard lol</div>;
}

export default Dashboard;

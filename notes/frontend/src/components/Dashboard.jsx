import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";

function Dashboard(props) {
  const [folder, setFolder] = useState("");

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

  const deleteNote = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete_note/${id}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const createFolder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/create_folder/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          folder: folder,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const listTags = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/list_tags/", {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <NoteForm />
      <button onClick={handleLogOut}>Log Out</button>
      <button
        onClick={() => {
          deleteNote(1);
        }}
      >
        Delete Note
      </button>
      <div>
        <form onSubmit={createFolder}>
          <input
            type="text"
            placeholder="Create Folder"
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value);
            }}
          />
          <button type="submit">Create Folder</button>
        </form>
      </div>
      <div onClick={listTags}>Tags</div>
    </div>
  );
}

export default Dashboard;

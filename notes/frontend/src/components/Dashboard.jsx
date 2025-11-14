import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TagList from "./TagList";
import NoteForm from "./NoteForm";
import Notes from "./Notes";
import View from "./View";
import NavBar from "./NavBar";
import NoteActions from "./NoteActions";
import "../components/dashboard.css";
import plusIcon from "../assets/images/icon-plus.svg";

function Dashboard(props) {
  const [folder, setFolder] = useState("");
  const [view, setView] = useState("note");
  const [folderList, setFolderList] = useState([]);
  const [showActions, setshowActions] = useState(true);

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

  useEffect(() => {
    fetch("http://localhost:8000/api/list_folders/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          console.log("Folders:", data.folders);
          setFolderList(data.folders);
        }
      })
      .catch(console.error);
  }, []);
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
    <div className="dashboard-container">
      <div className="small">
        <Header showSearch={false} showLogo={true} />
        <View view={view} />
        <NavBar view={view} setView={setView} />
        <div className="new-note-icon">
          <img src={plusIcon} alt="" />
        </div>
      </div>

      <div className="big">
        <Sidebar />
        <div className="grid">
          <Header />
          <Notes />
          <NoteForm />
          {showActions && <NoteActions />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

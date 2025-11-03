import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TagList from "./TagList";
import NoteForm from "./NoteForm";
import Notes from "./Notes";
import Footer from "./Footer";
import NoteActions from "./NoteActions";
import "../components/dashboard.css";

function Dashboard(props) {
  const [folder, setFolder] = useState("");
  const [folderList, setFolderList] = useState([]);

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
      {/* <NoteForm /> */}
      {/* <button onClick={handleLogOut}>Log Out</button> */}
      {/* <button */}
      {/*   onClick={() => { */}
      {/*     deleteNote(1); */}
      {/*   }} */}
      {/* > */}
      {/*   Delete Note */}
      {/* </button> */}
      {/* <div> */}
      {/*   <form onSubmit={createFolder}> */}
      {/*     <input */}
      {/*       type="text" */}
      {/*       placeholder="Create Folder" */}
      {/*       value={folder} */}
      {/*       onChange={(e) => { */}
      {/*         setFolder(e.target.value); */}
      {/*       }} */}
      {/*     /> */}
      {/*     <button type="submit">Create Folder</button> */}
      {/*   </form> */}
      {/* </div> */}
      {/* <div onClick={listTags}>Tags</div> */}
      {/* <div> */}
      {/*   {folderList */}
      {/*     ? folderList.map((item) => <ul key={item.id}>{item.name}</ul>) */}
      {/*     : "No folders created"} */}
      {/* </div> */}
      <Sidebar />
      {/* <div className="red">red</div> */}

      <div className="grid">
        <Header />
        {/* <div className="blue">blue</div> */}
        {/* <div className="main"> */}
        <Notes />
        <NoteForm />
        <NoteActions />
        {/* </div> */}
        <TagList></TagList>
        <Footer />
        {/* <div className="footer">Footer</div> */}
        {/* <div className="yellow">yellow</div> */}
        {/* <div className="orange">orange</div> */}
      </div>
    </div>
  );
}

export default Dashboard;

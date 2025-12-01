import { useEffect, useState, useContext } from "react";
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
import Modal from "./Modal";
import { NotificationContext } from "./NotificationContext";

function Dashboard(props) {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [userData, setUserData] = useState({});
  const [view, setView] = useState("note");
  const [selectedNote, setSelectedNote] = useState(null);
  // const [folderList, setFolderList] = useState([]);
  const [showActions, setshowActions] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    body: "",
    image: null,
    confirmText: "",
  });

  const { addNotification } = useContext(NotificationContext);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    const result = await response.json();
    console.log(result);
    setUserData(result.user_data);
    setFolders(result.folders);
    setTags(result.tags);
    setNotes(result.notes);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //
  // useEffect(() => {
  //   fetch("http://localhost:8000/api/list_folders/", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status) {
  //         console.log("Folders:", data.folders);
  //         setFolderList(data.folders);
  //       }
  //     })
  //     .catch(console.error);
  // }, []);
  // Come here

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

  const createNote = async (noteData) => {
    try {
      const response = await fetch("http://localhost:8000/api/create_note/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(noteData),
      });
      const result = await response.json();
      if (result.status) {
        addNotification(result.message);
        await fetchUserData();
      }
      return result.status;
    } catch (e) {
      console.log(e);
    }
  };

  const updateNote = async (noteId, noteData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/update_note/${noteId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(noteData),
        },
      );
      const result = await response.json();
      if (result.status) {
        addNotification(result.message);
        await fetchUserData();
      }
      return result.status;
    } catch (e) {
      console.log(e);
    }
  };

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

  const fetchNote = async (noteId) => {
    const response = await fetch(
      `http://localhost:8000/api/fetch_note/${noteId}/`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const result = await response.json();
    console.log(result.note);
    setSelectedNote(result.note);
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

  const fetchTags = async () => {
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
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          modalTitle={modalData.title}
          modalBody={modalData.body}
          modalImage={modalData.image}
          confirmText={modalData.confirmText}
        />
      )}
      <div className="small">
        <Header showSearch={false} showLogo={true} />
        <View
          setSelectedNote={setSelectedNote}
          fetchNote={fetchNote}
          view={view}
          notes={notes}
          folders={folders}
          tags={tags}
          selectedNote={selectedNote}
          updateNote={updateNote}
          createNote={createNote}
        />
        <NavBar view={view} setView={setView} />
        <div className="new-note-icon">
          <img src={plusIcon} alt="" />
        </div>
      </div>
      <div className="big">
        <Sidebar folders={folders} tags={tags} />
        <div className="grid">
          <Header />
          <Notes
            setSelectedNote={setSelectedNote}
            fetchNote={fetchNote}
            notes={notes}
          />
          <NoteForm
            updateNote={updateNote}
            createNote={createNote}
            userFolders={folders}
            selectedNote={selectedNote}
          />
          {showActions && <NoteActions openModal={openModal} />}
        </div>
      </div>
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Dashboard;

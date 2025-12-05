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
  const [notesInfoMessage, setNotesInfoMessage] = useState("");
  const [emptyState, setEmptyState] = useState({
    isEmpty: false,
    message: "",
  });
  const [selectedNote, setSelectedNote] = useState(null);
  // const [folderList, setFolderList] = useState([]);
  const [showActions, setshowActions] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [action, setAction] = useState("");
  const [modalData, setModalData] = useState({
    title: "",
    body: "",
    image: null,
    confirmText: "",
    actionFunc: null,
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

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete_note/${noteId}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const result = await response.json();
      console.log(result);
      addNotification(result.message);
      await fetchUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const archiveNote = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/archive_note/${noteId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const result = await response.json();
      console.log(result);
      addNotification(result.message);
      await fetchUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotes = async (filter = "all") => {
    const response = await fetch(
      `http://localhost:8000/api/get_notes/?filter=${filter}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const result = await response.json();
    setNotes(result.notes);
  };

  const searchNotes = async (query) => {
    if (!query.trim()) {
      fetchNotes();
      setNotesInfoMessage("");
      setEmptyState({ isEmpty: false });
      return;
    }
    const response = await fetch(
      `http://localhost:8000/api/search_notes/?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const result = await response.json();
    const notes = result.notes || [];

    setNotes(notes);

    if (notes.length === 0) {
      setEmptyState({
        isEmpty: true,
        message:
          "You don’t have any notes available in this tab. Start a new note to capture your thoughts and ideas.",
      });
    } else {
      setEmptyState({ isEmpty: false });
    }
  };

  const fetchSingleNote = async (noteId) => {
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
          actionFunc={modalData.actionFunc}
          selectedNote={selectedNote}
        />
      )}
      <div className="small">
        <Header
          setNotesInfoMessage={setNotesInfoMessage}
          searchNotes={searchNotes}
          showSearch={false}
          showLogo={true}
        />
        <View
          setSelectedNote={setSelectedNote}
          fetchSingleNote={fetchSingleNote}
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
        <Sidebar fetchNotes={fetchNotes} folders={folders} tags={tags} />
        <div className="grid">
          <Header
            setNotesInfoMessage={setNotesInfoMessage}
            searchNotes={searchNotes}
          />
          <Notes
            notesInfoMessage={notesInfoMessage}
            setSelectedNote={setSelectedNote}
            fetchSingleNote={fetchSingleNote}
            notes={notes}
          />
          {emptyState.isEmpty ? (
            <div style={{ color: "red" }}>{emptyState.message}</div>
          ) : (
            <NoteForm
              updateNote={updateNote}
              createNote={createNote}
              userFolders={folders}
              selectedNote={selectedNote}
            />
          )}
          {showActions && (
            <NoteActions
              selectedNote={selectedNote}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              openModal={openModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <div> */
}
{
  /*   <button onClick={handleLogOut}>Log Out</button> */
}
{
  /* </div> */
}

export default Dashboard;

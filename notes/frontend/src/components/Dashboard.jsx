import { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Settings from "./Settings.jsx";
import Search from "./Search.jsx";
import Logo from "./Logo.jsx";
import TagList from "./TagList";
import NoteForm from "./NoteForm";
import Notes from "./Notes";
import View from "./View";
import NavBar from "./NavBar";
import TaggedNotes from "./TaggedNotes";
import NoteActions from "./NoteActions";
import "../components/dashboard.css";
import plusIcon from "../assets/images/icon-plus.svg";
import Modal from "./Modal";
import { NotificationContext } from "./NotificationContext";

function Dashboard(props) {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [tags, setTags] = useState([]);
  const [highlight, setHighlight] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [userData, setUserData] = useState({});
  const [view, setView] = useState("all");
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
  const [modalData, setModalData] = useState(null);

  const { addNotification } = useContext(NotificationContext);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const createNewNote = () => {
    setSelectedNote(null);
    setView("form");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToAllNotes = () => {
    setSearchQuery("");
    setSelectedFilter("all");
    setHighlight("all");
  };

  const goToArchivedNotes = () => {
    setSearchQuery("");
    setSelectedFilter("archived");
    setHighlight("archived");
    // fetchNotes("archived");
  };

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    const result = await response.json();
    // console.log(result);
    setUserData(result.user_data);
    setFolders(result.folders);
    setTags(result.tags);
    setNotes(result.notes);
    setHasFetched(true);

    // setSelectedNote(result.notes[0]);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   setSelectedNote(notes[0]);
  // }, [selectedNote]);

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

      // console.log(result);
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
      setSelectedNote(result.note[0]);
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
        await fetchNotes(selectedFilter);
        await fetchTags();
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
      // console.log(result);
      addNotification(result.message);
      // await fetchUserData();
      setSelectedNote(null);
      await fetchNotes(selectedFilter);
      await fetchTags();
    } catch (err) {
      console.log(err);
    }
  };

  const getNotesByTags = async (tag) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get_notes_by_tags/?tag=${tag}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const result = await response.json();
      // console.log("tagged notes here", result.notes);
      setNotes(result.notes);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/list_folders/", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setFolders(result.folders);
    } catch (e) {
      console.log(e);
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
      // console.log(result);
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
    // console.log(result.note);
    setSelectedNote(result.note);
  };

  const createFolder = async (folderName) => {
    try {
      const response = await fetch("http://localhost:8000/api/create_folder/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          folder: folderName,
        }),
      });
      const result = await response.json();
      fetchFolders();
      addNotification(result.message);
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
      setTags(result.tags);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateBack = () => {
    setSelectedNote(null);
    // if (view === "form") {
    //   setView("taggedNotes");
    // } else {
    setView(selectedFilter);
    // }
    // fetchNotes(selectedFilter);
  };

  return (
    <div className="dashboard-container">
      {isModalOpen && (
        <Modal
          deleteNote={deleteNote}
          archiveNote={archiveNote}
          createFolder={createFolder}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          modal={modalData}
          // modalTitle={modalData.title}
          // modalBody={modalData.body}
          // modalImage={modalData.image}
          // confirmText={modalData.confirmText}
          // actionFunc={modalData.actionFunc}
          // selectedNote={selectedNote}
        />
      )}
      <div className="small">
        <Logo />
        <Header
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
        // setNotesInfoMessage={setNotesInfoMessage}
        // searchNotes={searchNotes}
        // // showSearch={false}
        // showLogo={true}
        />

        <View
          goToAllNotes={goToAllNotes}
          goToArchivedNotes={goToArchivedNotes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notesInfoMessage={notesInfoMessage}
          navigateBack={navigateBack}
          searchNotes={searchNotes}
          setNotesInfoMessage={setNotesInfoMessage}
          hasFetched={hasFetched}
          setHighlight={setHighlight}
          getNotesByTags={getNotesByTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          setEmptyState={setEmptyState}
          setSelectedNote={setSelectedNote}
          fetchNotes={fetchNotes}
          fetchSingleNote={fetchSingleNote}
          view={view}
          setView={setView}
          openModal={openModal}
          archiveNote={archiveNote}
          deleteNote={deleteNote}
          notes={notes}
          folders={folders}
          tags={tags}
          selectedNote={selectedNote}
          updateNote={updateNote}
          createNote={createNote}
        />
        <NavBar view={view} setView={setView} />
        <div onClick={createNewNote} className="new-note-icon">
          <img src={plusIcon} alt="" />
        </div>
      </div>
      <div className="big">
        <Sidebar
          setSearchQuery={setSearchQuery}
          highlight={highlight}
          setHighlight={setHighlight}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          getNotesByTags={getNotesByTags}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          fetchNotes={fetchNotes}
          folders={folders}
          tags={tags}
          setView={setView}
          goToAllNotes={goToAllNotes}
          goToArchivedNotes={goToArchivedNotes}
        />
        <div className="grid">
          <div className="app-header">
            <Header />
            <Search
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setEmptyState={setEmptyState}
              setNotesInfoMessage={setNotesInfoMessage}
              searchNotes={searchNotes}
              fetchNotes={fetchNotes}
            />
            <Settings />
          </div>
          <Notes
            selectedNote={selectedNote}
            notesInfoMessage={notesInfoMessage}
            hasFetched={hasFetched}
            createNewNote={createNewNote}
            setView={setView}
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
              setSelectedNote={setSelectedNote}
              selectedNote={selectedNote}
              setView={setView}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              createFolder={createFolder}
              openModal={openModal}
            />
          )}
        </div>
      </div>
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Settings from "./Settings.jsx";
import Search from "./Search.jsx";
import Logo from "./Logo.jsx";
import NoteForm from "./NoteForm";
import Notes from "./Notes";
import View from "./View";
import NavBar from "./NavBar";
import NoteActions from "./NoteActions";
import Modal from "./Modal";
import plusIcon from "../assets/images/icon-plus.svg";
import "../components/dashboard.css";

import { NotificationContext } from "./NotificationContext";

function Dashboard(props) {
  const [showHeading, setShowHeading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [heading, setHeading] = useState("All Notes");
  const [folders, setFolders] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [tags, setTags] = useState([]);
  const [highlight, setHighlight] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState({
    id: null,
    name: "",
  });
  const [selectedTag, setSelectedTag] = useState({
    id: null,
    name: "",
  });
  const [userData, setUserData] = useState({});
  const [view, setView] = useState("all");
  const [notesInfoMessage, setNotesInfoMessage] = useState("");
  const [emptyState, setEmptyState] = useState({
    isEmpty: false,
    message: "",
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [showActions, setshowActions] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { addNotification } = useContext(NotificationContext);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const createNewNote = () => {
    setSearchQuery("");
    setEmptyState({ isEmpty: false });
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
    setHeading("All Notes");
  };

  const goToArchivedNotes = () => {
    setSearchQuery("");
    setSelectedFilter("archived");
    setHighlight("archived");
    setHeading("Archived Notes");
    // fetchNotes("archived");
  };

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/api/dashboard", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
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

  useEffect(() => {
    if (notes.length > 0) {
      setSelectedNote(notes[0]);
      console.log("Auto-selecting:", notes[0].title);
    } else {
      setSelectedNote(null);
    }
  }, [notes]);

  const handleLogOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to log out");

      const result = await response.json();
      props.setPage("LogIn");
      addNotification(result.message);
    } catch (err) {
      console.log(err);
      addNotification("Failed to create note. Try again", true);
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

      if (!result.status) {
        addNotification(result.message, true);
        return;
      }

      addNotification(result.message);
      await fetchNotes(selectedFilter);
      await fetchTags();
    } catch (e) {
      console.log(e);
      addNotification("Failed to create note. Try again", true);
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

      if (!result.status) {
        addNotification(result.message, true);
        return;
      }

      addNotification(result.message);
      await fetchNotes(selectedFilter);
      await fetchTags();
    } catch (e) {
      console.log(e);
      addNotification("Failed to update note. Please try again.", true);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete_note/${noteId}/`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const result = await response.json();

      if (!result.status) {
        addNotification(result.message, true);
        return;
      }

      addNotification(result.message);
      await fetchNotes(selectedFilter);
      await fetchTags();
    } catch (err) {
      console.log(err);
      addNotification("Failed to delete note. Please try again.", true);
    }
  };

  const getNotesByTag = async (tag_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get_notes_by_tags/?tag_id=${tag_id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();
      setHasFetched(true);

      if (!result.status) {
        addNotification(result.message, true);
        return;
      }

      setNotes(result.notes);

      if (!result.notes || result.notes.length === 0) {
        setEmptyState({ message: "No notes found for this tag" });
      }
    } catch (e) {
      console.error(e);
      addNotification("Failed to fetch notes. Please try again.", true);
    }
  };

  const getNotesByFolder = async (folder_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get_notes_by_folder/?folder_id=${folder_id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();
      setHasFetched(true);

      if (!result.status) {
        addNotification(result.message, true);
        return;
      }

      setNotes(result.notes);

      if (!result.notes || result.notes.length === 0) {
        setEmptyState({ message: "No notes found in this folder" });
      }
    } catch (e) {
      console.log(e);
      addNotification("Failed to fetch notes. Please try again.", true);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/get_folders/", {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!result.status) {
        addNotification(result.message || "Failed to fetch folders.", true);
        return;
      }

      setFolders(result.folders);
    } catch (e) {
      console.error("Failed to fetch folders:", e);
      addNotification("Failed to fetch folders. Please try again.", true);
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

      if (!result.status) {
        addNotification(result.message || "Failed to archive note.", true);
        return;
      }

      addNotification(result.message);
      await fetchNotes();
    } catch (err) {
      console.error("Error archiving note:", err);
      addNotification("Failed to archive note. Please try again.", true);
    }
  };

  const fetchNotes = async (filter = "all") => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get_notes/?filter=${filter}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.status) {
        addNotification(result.message, true);
        return;
      }

      setNotes(result.notes);

      if (!result.notes || result.notes.length === 0) {
        setEmptyState({
          message:
            "You don’t have any notes yet. Start a new note to capture your thoughts and ideas.",
        });
      }
    } catch (e) {
      console.error("Failed to fetch notes:", e);
      addNotification("Failed to fetch notes. Please try again.", true);
    }
  };

  const searchNotes = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/search_notes/?query=${encodeURIComponent(query)}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.status) {
        addNotification(result.message || "Failed to search notes.", true);
        return;
      }

      const notes = result.notes || [];
      setNotes(notes);

      if (notes.length === 0) {
        setEmptyState({
          isEmpty: true,
          message:
            "No notes match your search. Try a different keyword or create a new note.",
        });
      }
    } catch (err) {
      console.error("Failed to search notes:", err);
      addNotification("Failed to search notes. Please try again.", true);
    }
  };

  const fetchSingleNote = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/fetch_note/${noteId}/`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.status) {
        addNotification(result.message, true);
        return;
      }

      setSelectedNote(result.note);
    } catch (e) {
      console.log(e);
      addNotification("Failed to fetch note. Please try again.", true);
    }
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
    } catch (err) {
      console.log(err);
    }
  };

  const navigateBack = () => {
    setSelectedNote(null);
    setView(selectedFilter);
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
        />
      )}
      <div className="small">
        <div className="top-bar">
          <Logo />
          <Settings logOut={handleLogOut} />
        </div>
        {showHeading && <Header heading={heading} />}
        <View
          setShowHeading={setShowHeading}
          setHeading={setHeading}
          selectedFolder={selectedFolder}
          emptyState={emptyState}
          setSelectedFolder={setSelectedFolder}
          getNotesByFolder={getNotesByFolder}
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
          getNotesByTag={getNotesByTag}
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
        <NavBar setHeading={setHeading} view={view} setView={setView} />
        <div onClick={createNewNote} className="new-note-icon">
          <img src={plusIcon} alt="" />
        </div>
      </div>
      <div className="big">
        <Sidebar
          setHeading={setHeading}
          setSelectedFolder={setSelectedFolder}
          setSearchQuery={setSearchQuery}
          highlight={highlight}
          setHighlight={setHighlight}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          getNotesByTag={getNotesByTag}
          getNotesByFolder={getNotesByFolder}
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
            <Header heading={heading} />
            <Search
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setEmptyState={setEmptyState}
              setNotesInfoMessage={setNotesInfoMessage}
              searchNotes={searchNotes}
              fetchNotes={fetchNotes}
            />
            <Settings logOut={handleLogOut} />
          </div>
          <Notes
            selectedNote={selectedNote}
            notesInfoMessage={notesInfoMessage}
            hasFetched={hasFetched}
            createNewNote={createNewNote}
            setView={setView}
            setSelectedNote={setSelectedNote}
            fetchSingleNote={fetchSingleNote}
            setEmptyState={setEmptyState}
            emptyState={emptyState}
            notes={notes}
          />
          {emptyState.isEmpty ? (
            <div className="alert error-text">
              You don’t have any notes available in this tab. Start a new note
              to capture your thoughts and ideas.
            </div>
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
    </div>
  );
}

export default Dashboard;

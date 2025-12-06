import plus from "../assets/images/icon-plus.svg";
import "../components/Notes.css";
import "../components/NoteList.css";
import NoteList from "./NoteList";

function Notes({
  selectedNote,
  createNewNote,
  setView,
  notes,
  notesInfoMessage,
  fetchSingleNote,
  setSelectedNote,
}) {
  return (
    <div className="notes">
      <div className="note-list-container">
        <button className="new-note-btn" onClick={createNewNote}>
          <img src={plus} alt="" /> <span>Create New Note</span>
        </button>
        <div style={{ color: "red" }}>{notesInfoMessage}</div>
        <NoteList
          selectedNote={selectedNote}
          setView={setView}
          notes={notes}
          fetchSingleNote={fetchSingleNote}
        />
      </div>
    </div>
  );
}

export default Notes;

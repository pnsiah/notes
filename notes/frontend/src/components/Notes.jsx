import plus from "../assets/images/icon-plus.svg";
import "../components/Notes.css";
import "../components/NoteList.css";
import NoteList from "./NoteList";

function Notes({
  selectedNote,
  emptyState,
  hasFetched,
  resetNoteForm,
  setView,
  notes,
  notesInfoMessage,
  fetchSingleNote,
}) {
  return (
    <div className="notes">
      <div className="note-list-container">
        <button className="new-note-btn" onClick={resetNoteForm}>
          <img src={plus} alt="" /> <span>Create New Note</span>
        </button>
        {notesInfoMessage && (
          <div className="notes-message">{notesInfoMessage}</div>
        )}
        <NoteList
          emptyState={emptyState}
          hasFetched={hasFetched}
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

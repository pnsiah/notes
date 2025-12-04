import plus from "../assets/images/icon-plus.svg";
import "../components/Notes.css";
import "../components/NoteList.css";
import NoteList from "./NoteList";

function Notes({ notes, noteListInfo, fetchSingleNote, setSelectedNote }) {
  const createNewForm = () => {
    setSelectedNote(null);
  };
  return (
    <div className="notes">
      <div className="note-list-container">
        <button className="new-note-btn" onClick={createNewForm}>
          <img src={plus} alt="" /> <span>Create New Note</span>
        </button>
        <div style={{ color: "red" }}>{noteListInfo}</div>
        <NoteList notes={notes} fetchSingleNote={fetchSingleNote} />
      </div>
    </div>
  );
}

export default Notes;

import NoteList from "./NoteList";
import "./TaggedNotes.css";

function TaggedNotes({ notes, selectedNote, setView, fetchSingleNote }) {
  return (
    <div className="taggedNotes">
      <h3>Tagged Notes</h3>
      <NoteList
        selectedNote={selectedNote}
        setView={setView}
        notes={notes}
        fetchSingleNote={fetchSingleNote}
      />
    </div>
  );
}

export default TaggedNotes;

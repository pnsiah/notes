import EmptyNotes from "./EmptyNotes";
import "../components/NoteList.css";

function NoteList({
  emptyState,
  hasFetched,
  selectedNote,
  setView,
  notes,
  fetchSingleNote,
}) {
  const openNote = (id) => {
    fetchSingleNote(id);
    setView("form");
  };

  if (!hasFetched) {
    return null;
  }

  return (
    <ul className="notes-list">
      {notes.length === 0 ? (
        <EmptyNotes emptyState={emptyState} />
      ) : (
        notes.map((note) => (
          <li onClick={() => openNote(note.id)} key={note.id}>
            <button
              className={`note ${selectedNote?.id === note.id ? "note-active" : ""}`}
            >
              <h4 className="note-title">{note.title}</h4>
              <div className="tags-section">
                {note.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <p className="date">{note.date_created}</p>
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

export default NoteList;

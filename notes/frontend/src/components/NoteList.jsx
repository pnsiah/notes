import "../components/NoteList.css";
import EmptyNotes from "./EmptyNotes";

function NoteList({
  emptyState,
  hasFetched,
  selectedNote,
  setView,
  notes,
  fetchSingleNote,
  setSelectedNote,
}) {
  const show = (id) => {
    fetchSingleNote(id);
    setView("form");
    // setSelectedNote({ ...note });
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
          <li onClick={() => show(note.id)} key={note.id}>
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

import "../components/NoteList.css";

function NoteList({
  hasFetched,
  selectedNote,
  setView,
  notes,
  fetchSingleNote,
}) {
  const show = (id) => {
    fetchSingleNote(id);
    setView("form");
  };

  if (!hasFetched) {
    return null;
  }

  return (
    <ul className="notes-list">
      {notes.length === 0 ? (
        <li style={{ color: "red" }}>
          You don’t have any notes yet. Start a new note to capture your
          thoughts and ideas.
        </li>
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

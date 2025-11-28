import "../components/NoteList.css";

function NoteList({ notes, fetchNote }) {
  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li onClick={() => fetchNote(note.id)} key={note.id}>
          <button className="note" key={note.id}>
            <h4 className="note-title">{note.title}</h4>
            <div className="tags-section">
              {note.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
            <p className="date">{note.date_created}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

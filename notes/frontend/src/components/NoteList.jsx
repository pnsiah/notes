import "../components/NoteList.css";

function NoteList({ notes }) {
  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li>
          <button className="note" key={note.id}>
            <h4 className="note-title">{note.title}</h4>
            <div className="tags-section">
              {note.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
            <p className="date">{note.date}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

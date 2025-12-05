import Notes from "./Notes";
import TagList from "./TagList";
import NoteForm from "./NoteForm";
import FolderList from "./FolderList";
import Search from "./Search";
import "../components/View.css";

function View({
  view,
  setEmptyState,
  tags,
  notes,
  fetchSingleNote,
  selectedNote,
  folders,
  updateNote,
  createNote,
  fetchNotes,
}) {
  return (
    <div className="view">
      {view === "notes" && (
        <Notes fetchSingleNote={fetchSingleNote} notes={notes} />
      )}
      {view === "form" && (
        <NoteForm
          createNote={createNote}
          updateNote={updateNote}
          userFolders={folders}
          selectedNote={selectedNote}
        />
      )}
      {view === "tags" && <TagList tags={tags} />}
      {view === "folders" && <FolderList folders={folders} />}
      {view === "search" && (
        <Search setEmptyState={setEmptyState} fetchNotes={fetchNotes} />
      )}
      {view === "settings" && <Settings />}
    </div>
  );
}

export default View;

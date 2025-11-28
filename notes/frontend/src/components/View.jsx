import Notes from "./Notes";
import TagList from "./TagList";
import NoteForm from "./NoteForm";
import FolderList from "./FolderList";
import Search from "./Search";
import "../components/View.css";

function View({ view, tags, notes, fetchNote }) {
  return (
    <div className="view">
      {view === "notes" && <Notes fetchNote={fetchNote} notes={notes} />}
      {view === "form" && <NoteForm />}
      {view === "tags" && <TagList tags={tags} />}
      {view === "folders" && <FolderList folders={folders} />}
      {view === "search" && <Search />}
      {view === "settings" && <Settings />}
    </div>
  );
}

export default View;

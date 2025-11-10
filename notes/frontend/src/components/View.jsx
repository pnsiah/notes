import Notes from "./Notes";
import TagList from "./TagList";
import Search from "./Search";
import "../components/View.css";

function View({ view }) {
  return (
    <div className="view">
      {view === "notes" && <Notes />}
      {view === "form" && <NoteForm />}
      {view === "tags" && <TagList />}
      {view === "search" && <Search />}
      {view === "settings" && <Settings />}
    </div>
  );
}

export default View;

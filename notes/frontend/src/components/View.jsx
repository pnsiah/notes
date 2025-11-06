import Notes from "./Notes";
import TagList from "./TagList";
import Search from "./Search";
import plusIcon from "../assets/images/icon-plus.svg";
import "../components/View.css";

function View({ view }) {
  return (
    <div className="view">
      {view === "notes" && <Notes />}
      {view === "form" && <NoteForm />}
      {view === "tags" && <TagList />}
      {view === "search" && <Search />}
      {view === "settings" && <Settings />}
      <div className="new-note-icon">
        <img src={plusIcon} alt="" />
      </div>
    </div>
  );
}

export default View;

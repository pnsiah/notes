import Notes from "./Notes";
import TagList from "./TagList";
import NoteForm from "./NoteForm";
import FolderList from "./FolderList";
import TaggedNotes from "./TaggedNotes";
import Search from "./Search";
import "../components/View.css";
import { useEffect } from "react";
import NoteActions from "./NoteActions";

function View({
  getNotesByTags,
  setSelectedNote,
  setView,
  selectedFilter,
  setSelectedFilter,
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
  useEffect(() => {
    if (view === "all") {
      setSelectedFilter("all");
    }
    if (view === "archived") {
      setSelectedFilter("archived");
    }
  }, [view]);
  return (
    <div className="view">
      {view === "all" && (
        <Notes
          setView={setView}
          fetchSingleNote={fetchSingleNote}
          notes={notes}
        />
      )}
      {view === "archived" && (
        <Notes
          setView={setView}
          fetchSingleNote={fetchSingleNote}
          notes={notes}
        />
      )}
      {view === "form" && (
        <>
          <NoteActions
            setSelectedNote={setSelectedNote}
            setView={setView}
            fetchNotes={fetchNotes}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <NoteForm
            createNote={createNote}
            updateNote={updateNote}
            userFolders={folders}
            selectedNote={selectedNote}
          />
        </>
      )}
      {view === "tags" && (
        <TagList getNotesByTags={getNotesByTags} tags={tags} />
      )}
      {view === "folders" && <FolderList folders={folders} />}
      {view === "search" && (
        <Search setEmptyState={setEmptyState} fetchNotes={fetchNotes} />
      )}
      {view === "settings" && <Settings />}
      {view === "taggedNotes" && (
        <TaggedNotes
          selectedNote={selectedNote}
          setView={setView}
          notes={notes}
          fetchSingleNote={fetchSingleNote}
        />
      )}
    </div>
  );
}

{
  /* <TaggedNotes */
}
{
  /* /> */
}
export default View;

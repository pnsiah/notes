import { useEffect } from "react";
import NoteList from "./NoteList";
import Notes from "./Notes";
import "./TaggedNotes.css";

function TaggedNotes({
  setSelectedFilter,
  selectedTag,
  hasFetched,
  setSelectedTag,
  getNotesByTag,
  notes,
  selectedNote,
  setView,
  view,
  fetchSingleNote,
  setSelectedNote,
}) {
  useEffect(() => {
    if (!selectedTag) return;
    getNotesByTag(selectedTag.id);
  }, [selectedTag]);

  return (
    <div className="taggedNotes">
      <h3>Tagged Notes: "{selectedTag.name}"</h3>
      <div>
        <NoteList
          selectedNote={selectedNote}
          setView={setView}
          notes={notes}
          fetchSingleNote={fetchSingleNote}
          hasFetched={hasFetched}
        />
      </div>
    </div>
  );
}

export default TaggedNotes;

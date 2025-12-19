import { useEffect } from "react";
import NoteList from "./NoteList";
import Notes from "./Notes";
import "./TaggedNotes.css";

function TaggedNotes({
  setSelectedFilter,
  selectedTag,
  setSelectedTag,
  getNotesByTags,
  notes,
  selectedNote,
  setView,
  view,
  fetchSingleNote,
  setSelectedNote,
}) {
  useEffect(() => {
    if (!selectedTag) return;
    getNotesByTags(selectedTag);
    console.log({ selectedTag });
  }, [selectedTag]);

  return (
    <div className="taggedNotes">
      <h3>Tagged Notes</h3>
      <div style={{ background: "red" }}>
        <NoteList
          selectedNote={selectedNote}
          setView={setView}
          notes={notes}
          fetchSingleNote={fetchSingleNote}
        />
      </div>
    </div>
  );
}

export default TaggedNotes;

import { useEffect } from "react";
import NoteList from "./NoteList";
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
}) {
  useEffect(() => {
    if (!selectedTag) return;

    getNotesByTags(selectedTag);
    console.log({ selectedTag });
  }, [selectedTag]);

  return (
    <div className="taggedNotes">
      <h3>Tagged Notes</h3>
      <NoteList
        selectedNote={selectedNote}
        setView={setView}
        notes={notes}
        fetchSingleNote={fetchSingleNote}
      />
    </div>
  );
}

export default TaggedNotes;

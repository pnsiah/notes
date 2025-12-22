import { useEffect } from "react";
import NoteList from "./NoteList";
import Notes from "./Notes";
import "./TaggedNotes.css";

function TaggedNotes({
  setSelectedFilter,
  selectedTagId,
  hasFetched,
  setSelectedTagId,
  getNotesByTags,
  notes,
  selectedNote,
  setView,
  view,
  fetchSingleNote,
  setSelectedNote,
}) {
  useEffect(() => {
    if (!selectedTagId) return;
    getNotesByTags(selectedTagId);
  }, [selectedTagId]);

  return (
    <div className="taggedNotes">
      {/* <h3>Tagged Notes: "{selectedTag}"</h3> */}
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

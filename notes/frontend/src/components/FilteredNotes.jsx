import { useEffect } from "react";
import NoteList from "./NoteList";
import Notes from "./Notes";
import "./TaggedNotes.css";

function FilteredNotes({
  emptyState,
  selectedItem,
  getNotes,
  hasFetched,
  notes,
  selectedNote,
  setView,
  fetchSingleNote,
}) {
  useEffect(() => {
    if (!selectedItem) return;
    getNotes(selectedItem.id);
  }, [selectedItem]);

  return (
    <div className="taggedNotes">
      <div>
        <NoteList
          emptyState={emptyState}
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

export default FilteredNotes;

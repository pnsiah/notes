import { useEffect } from "react";
import NoteList from "./NoteList";
import "./FilteredNotes.css";

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
  // fetch notes whenever selected item changes
  useEffect(() => {
    if (!selectedItem) return;
    getNotes(selectedItem.id);
  }, [selectedItem]);

  return (
    <div className="filtered-notes">
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

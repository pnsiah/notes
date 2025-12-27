import { useEffect } from "react";
import NoteList from "./NoteList";
import Notes from "./Notes";
import "./TaggedNotes.css";

function FilteredNotes({
  emptyState,
  filterType,
  setSelectedFilter,
  selectedItem,
  getNotes,
  // selectedTag,
  hasFetched,
  // setSelectedTag,
  // getNotesByTag,
  notes,
  selectedNote,
  setView,
  view,
  fetchSingleNote,
  setSelectedNote,
}) {
  useEffect(() => {
    if (!selectedItem) return;
    getNotes(selectedItem.id);
  }, [selectedItem]);

  return (
    <div className="taggedNotes">
      <h3>
        {filterType === "taggedNotes" ? "Tagged Notes" : "Folder Notes"}: "
        {selectedItem.name}"
      </h3>
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

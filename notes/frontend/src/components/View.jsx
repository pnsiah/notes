import { useEffect } from "react";
import Notes from "./Notes";
import TagList from "./TagList";
import FilteredNotes from "./FilteredNotes";
import NoteForm from "./NoteForm";
import FolderList from "./FolderList";
import Search from "./Search";
import NoteActions from "./NoteActions";
import "../components/View.css";

function View({
  selectedFilter,
  setHeading,
  setShowHeading,
  emptyState,
  setEmptyState,
  selectedFolder,
  setSelectedFolder,
  notesInfoMessage,
  getNotesByFolder,
  setSearchQuery,
  searchQuery,
  setNotesInfoMessage,
  searchNotes,
  navigateBack,
  hasFetched,
  openModal,
  setHighlight,
  selectedTag,
  setSelectedTag,
  getNotesByTag,
  setView,
  setSelectedFilter,
  view,
  tags,
  notes,
  fetchSingleNote,
  selectedNote,
  folders,
  updateNote,
  createNote,
  fetchNotes,
  goToAllNotes,
  goToArchivedNotes,
}) {
  useEffect(() => {
    // Navigate to the appropriate notes view
    if (view === "all") {
      goToAllNotes();
    }
    if (view === "archived") {
      goToArchivedNotes();
    }
    // Show or hide heading depending on view
    setShowHeading(view !== "form");
  }, [view]);

  const renderView = () => {
    // Render the appropriate component based on the current view state
    switch (view) {
      case "all":
        return (
          <Notes
            emptyState={emptyState}
            setView={setView}
            hasFetched={hasFetched}
            fetchSingleNote={fetchSingleNote}
            notes={notes}
          />
        );
      case "archived":
        return (
          <Notes
            emptyState={emptyState}
            setView={setView}
            hasFetched={hasFetched}
            fetchSingleNote={fetchSingleNote}
            notesInfoMessage={notesInfoMessage}
            notes={notes}
          />
        );
      case "form":
        return (
          <>
            <NoteActions
              selectedFilter={selectedFilter}
              openModal={openModal}
              selectedNote={selectedNote}
              navigateBack={navigateBack}
            />
            <NoteForm
              createNote={createNote}
              updateNote={updateNote}
              userFolders={folders}
              selectedNote={selectedNote}
            />
          </>
        );
      case "tags":
        return (
          <TagList
            setHeading={setHeading}
            setSelectedFilter={setSelectedFilter}
            setHighlight={setHighlight}
            setView={setView}
            setSelectedTag={setSelectedTag}
            tags={tags}
          />
        );
      case "folders":
        return (
          <FolderList
            setHeading={setHeading}
            setSelectedFolder={setSelectedFolder}
            setView={setView}
            setSelectedFilter={setSelectedFilter}
            setHighlight={setHighlight}
            folders={folders}
          />
        );
      case "search":
        return (
          <>
            <Search
              setNotesInfoMessage={setNotesInfoMessage}
              searchNotes={searchNotes}
              setEmptyState={setEmptyState}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              fetchNotes={fetchNotes}
            />
            <Notes
              emptyState={emptyState}
              setView={setView}
              hasFetched={hasFetched}
              fetchSingleNote={fetchSingleNote}
              notesInfoMessage={notesInfoMessage}
              notes={notes}
            />
          </>
        );
      case "taggedNotes":
        return (
          <FilteredNotes
            emptyState={emptyState}
            selectedItem={selectedTag}
            getNotes={getNotesByTag}
            selectedNote={selectedNote}
            setView={setView}
            notes={notes}
            fetchSingleNote={fetchSingleNote}
            hasFetched={hasFetched}
          />
        );
      case "folderNotes":
        return (
          <FilteredNotes
            emptyState={emptyState}
            selectedItem={selectedFolder}
            getNotes={getNotesByFolder}
            selectedNote={selectedNote}
            setView={setView}
            notes={notes}
            fetchSingleNote={fetchSingleNote}
            hasFetched={hasFetched}
          />
        );
      default:
        return null;
    }
  };

  return <div className="view">{renderView()}</div>;
}

export default View;

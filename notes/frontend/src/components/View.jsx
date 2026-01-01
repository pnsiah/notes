import Notes from "./Notes";
import TagList from "./TagList";
import FilteredNotes from "./FilteredNotes";
import NoteForm from "./NoteForm";
import FolderList from "./FolderList";
import Search from "./Search";
import "../components/View.css";
import { useEffect } from "react";
import NoteActions from "./NoteActions";

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
    // if (view === "taggedNote") return;
    // if (view === "folderNotes") return;
    if (view === "all") {
      goToAllNotes();
    }
    if (view === "archived") {
      goToArchivedNotes();
    }
    if (view === "form") {
      setShowHeading(false);
    } else {
      setShowHeading(true);
    }
  }, [view]);
  return (
    <div className="view">
      {view === "all" && (
        <Notes
          emptyState={emptyState}
          setView={setView}
          hasFetched={hasFetched}
          fetchSingleNote={fetchSingleNote}
          notes={notes}
        />
      )}
      {view === "archived" && (
        <Notes
          emptyState={emptyState}
          setView={setView}
          hasFetched={hasFetched}
          fetchSingleNote={fetchSingleNote}
          notesInfoMessage={notesInfoMessage}
          notes={notes}
        />
      )}
      {view === "form" && (
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
      )}
      {view === "tags" && (
        <TagList
          setHeading={setHeading}
          setSelectedFilter={setSelectedFilter}
          setHighlight={setHighlight}
          setView={setView}
          setSelectedTag={setSelectedTag}
          tags={tags}
        />
      )}
      {view === "folders" && (
        <FolderList
          setHeading={setHeading}
          setSelectedFolder={setSelectedFolder}
          setView={setView}
          setSelectedFilter={setSelectedFilter}
          setHighlight={setHighlight}
          folders={folders}
        />
      )}
      {view === "search" && (
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
            notes={notes}
            notesInfoMessage={notesInfoMessage}
          />
        </>
      )}
      {view === "taggedNotes" && (
        <>
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
        </>
      )}
      {view === "folderNotes" && (
        <>
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
        </>
      )}
    </div>
  );
}

export default View;

import Notes from "./Notes";
import TagList from "./TagList";
import FilteredNotes from "./FilteredNotes";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList.jsx";
import FolderList from "./FolderList";
import Settings from "./Settings.jsx";
import TaggedNotes from "./TaggedNotes";
import Search from "./Search";
import "../components/View.css";
import { useState, useEffect } from "react";
import NoteActions from "./NoteActions";

function View({
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
  archiveNote,
  deleteNote,
  setHighlight,
  selectedTag,
  setSelectedTag,
  getNotesByTag,
  setSelectedNote,
  setView,
  selectedFilter,
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
            openModal={openModal}
            setSelectedNote={setSelectedNote}
            selectedNote={selectedNote}
            navigateBack={navigateBack}
            setView={setView}
            fetchNotes={fetchNotes}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            deleteNote={deleteNote}
            archiveNote={archiveNote}
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
          selectedTag={selectedTag}
          getNotesByTag={getNotesByTag}
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
          getNotesByFolder={getNotesByFolder}
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
      {/* {view === "settings" && <Settings />} */}
      {view === "taggedNotes" && (
        <>
          <FilteredNotes
            filterType="taggedNotes"
            emptyState={emptyState}
            selectedItem={selectedTag}
            // setSelectedFilter={setSelectedFilter}
            setSelectedTag={setSelectedTag}
            getNotes={getNotesByTag}
            selectedTag={selectedTag}
            getNotesByTag={getNotesByTag}
            selectedNote={selectedNote}
            setView={setView}
            notes={notes}
            fetchSingleNote={fetchSingleNote}
            hasFetched={hasFetched}
          />
          {/* <TaggedNotes */}
          {/*   setSelectedFilter={setSelectedFilter} */}
          {/*   setSelectedTag={setSelectedTag} */}
          {/*   selectedTag={selectedTag} */}
          {/*   getNotesByTag={getNotesByTag} */}
          {/*   selectedNote={selectedNote} */}
          {/*   setView={setView} */}
          {/*   notes={notes} */}
          {/*   fetchSingleNote={fetchSingleNote} */}
          {/*   hasFetched={hasFetched} */}
          {/* /> */}
          {/* <Notes */}
          {/*   selectedNote={selectedNote} */}
          {/*   setView={setView} */}
          {/*   notes={notes} */}
          {/*   fetchSingleNote={fetchSingleNote} */}
          {/* /> */}
        </>
      )}
      {view === "folderNotes" && (
        <>
          <FilteredNotes
            filterType="folderNotes"
            emptyState={emptyState}
            selectedItem={selectedFolder}
            // setSelectedFilter={setSelectedFilter}
            setSelectedTag={setSelectedTag}
            getNotes={getNotesByFolder}
            selectedTag={selectedTag}
            getNotesByTag={getNotesByTag}
            selectedNote={selectedNote}
            setView={setView}
            notes={notes}
            fetchSingleNote={fetchSingleNote}
            hasFetched={hasFetched}
          />
          {/* <TaggedNotes */}
          {/*   setSelectedFilter={setSelectedFilter} */}
          {/*   setSelectedTag={setSelectedTag} */}
          {/*   selectedTag={selectedTag} */}
          {/*   getNotesByTag={getNotesByTag} */}
          {/*   selectedNote={selectedNote} */}
          {/*   setView={setView} */}
          {/*   notes={notes} */}
          {/*   fetchSingleNote={fetchSingleNote} */}
          {/*   hasFetched={hasFetched} */}
          {/* /> */}
          {/* <Notes */}
          {/*   selectedNote={selectedNote} */}
          {/*   setView={setView} */}
          {/*   notes={notes} */}
          {/*   fetchSingleNote={fetchSingleNote} */}
          {/* /> */}
        </>
      )}
    </div>
  );
}

export default View;

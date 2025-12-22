import Notes from "./Notes";
import TagList from "./TagList";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList.jsx";
import FolderList from "./FolderList";
import Settings from "./Settings.jsx";
import TaggedNotes from "./TaggedNotes";
import Search from "./Search";
import "../components/View.css";
import { useEffect } from "react";
import NoteActions from "./NoteActions";

function View({
  notesInfoMessage,
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
  getNotesByTags,
  setSelectedNote,
  setView,
  selectedFilter,
  setSelectedFilter,
  view,
  setEmptyState,
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
    if (view === "taggedNotes") return;
    if (view === "all") {
      goToAllNotes();
    }
    if (view === "archived") {
      goToArchivedNotes();
    }
  }, [view]);
  return (
    <div className="view">
      {view === "all" && (
        <Notes
          setView={setView}
          hasFetched={hasFetched}
          fetchSingleNote={fetchSingleNote}
          notes={notes}
        />
      )}
      {view === "archived" && (
        <Notes
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
          setSelectedFilter={setSelectedFilter}
          setHighlight={setHighlight}
          setView={setView}
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          getNotesByTags={getNotesByTags}
          tags={tags}
        />
      )}
      {view === "folders" && <FolderList folders={folders} />}
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
            setView={setView}
            hasFetched={hasFetched}
            fetchSingleNote={fetchSingleNote}
            notes={notes}
            notesInfoMessage={notesInfoMessage}
          />
        </>
      )}
      {view === "settings" && <Settings />}
      {view === "taggedNotes" && (
        <>
          <TaggedNotes
            setSelectedFilter={setSelectedFilter}
            setSelectedTag={setSelectedTag}
            selectedTag={selectedTag}
            getNotesByTags={getNotesByTags}
            selectedNote={selectedNote}
            setView={setView}
            notes={notes}
            fetchSingleNote={fetchSingleNote}
            hasFetched={hasFetched}
          />
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

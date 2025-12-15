import deleteIcon from "../assets/images/icon-delete.svg";
import restoreIcon from "../assets/images/icon-restore.svg";
import archive from "../assets/images/icon-archive.svg";
import folderIcon from "../assets/images/folder-open-regular-full.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import restore from "../assets/images/icon-restore.svg";
import back from "../assets/images/icon-arrow-left.svg";
import "../components/NoteActions.css";

function NoteActions({
  createFolder,
  setView,
  selectedFilter,
  setSelectedFilter,
  openModal,
  selectedNote,
  actionFunc,
  archiveNote,
  deleteNote,
  navigateBack,
  fetchNotes,
  setSelectedNote,
}) {
  const updateAction = (action) => {
    actionFunc(action);
  };

  const confirmText = selectedNote?.archived ? "Restore Note" : "Archive Note";
  const confirmIcon = selectedNote?.archived ? restore : archive;

  return (
    <div className="note-actions">
      <div>
        <button onClick={navigateBack} className="note-actions__back">
          <img className="icon" src={back} alt="" />
          <p>Go back</p>
        </button>
      </div>
      <div className="note-actions__group">
        <button
          onClick={() => {
            openModal({
              type: "create-folder",
              image: folderIcon,
              confirmText: "Create Folder",
              // payload: { noteId: selectedNote.id },
            });
          }}
          className="danger action-button"
        >
          <img className="icon folder-icon" src={folderIcon} alt="" />
          <span>Create Folder</span>
        </button>
        {selectedNote?.archived ? (
          <button
            onClick={() => {
              openModal({
                // title: "Archive Note",
                // body: "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
                // image: archiveButton,
                // confirmText: confirmText,
                // actionFunc: archiveNote,
                type: "restore-note",
                image: restoreIcon,
                confirmText: "Restore Note",
                payload: { noteId: selectedNote.id },
              });
            }}
            className="action-button"
          >
            <img className="icon" src={confirmIcon} alt="" />
            <span>{confirmText}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              openModal({
                type: "archive-note",
                image: archiveIcon,
                confirmText: "Archive Note",
                payload: { noteId: selectedNote.id },
              });
            }}
            className="action-button"
          >
            <img className="icon" src={confirmIcon} alt="" />
            <span>{confirmText}</span>
          </button>
        )}
        <button
          onClick={() => {
            openModal({
              type: "delete-note",
              image: deleteIcon,
              confirmText: "Delete Note",
              payload: { noteId: selectedNote.id },
            });
          }}
          className="danger action-button"
        >
          <img className="icon" src={deleteIcon} alt="" />
          <span>Delete Note </span>
        </button>
      </div>
    </div>
  );
}

export default NoteActions;

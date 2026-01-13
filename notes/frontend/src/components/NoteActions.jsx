import deleteIcon from "../assets/images/icon-delete.svg";
import restoreIcon from "../assets/images/icon-restore.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import folderIcon from "../assets/images/folder-open-regular-full.svg";
import back from "../assets/images/icon-arrow-left.svg";
import "../components/NoteActions.css";

function NoteActions({ openModal, selectedNote, navigateBack }) {
  const confirmText = selectedNote?.archived ? "Restore Note" : "Archive Note";
  const confirmIcon = selectedNote?.archived ? restoreIcon : archiveIcon;

  const handleCreateFolderClick = () => {
    // open create folder modal
    openModal({
      type: "create-folder",
      image: folderIcon,
      confirmText: "Create Folder",
      title: "Create Folder",
    });
  };

  const handleRestoreNoteClick = () => {
    // open restore note modal
    openModal({
      type: "restore-note",
      title: "Restore Note",
      image: restoreIcon,
      confirmText: "Restore Note",
      payload: { noteId: selectedNote.id },
    });
  };

  const handleArchiveNoteClick = () => {
    // open archive note modal
    openModal({
      type: "archive-note",
      image: archiveIcon,
      confirmText: "Archive Note",
      title: "Archive Note",
      payload: { noteId: selectedNote.id },
    });
  };

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
          onClick={handleCreateFolderClick}
          className="danger action-button"
        >
          <img className="icon folder-icon" src={folderIcon} alt="" />
          <span>Create Folder</span>
        </button>
        {selectedNote?.archived ? (
          <button onClick={handleRestoreNoteClick} className="action-button">
            <img className="icon" src={confirmIcon} alt="" />
            <span>{confirmText}</span>
          </button>
        ) : (
          <button onClick={handleArchiveNoteClick} className="action-button">
            <img className="icon" src={confirmIcon} alt="" />
            <span>{confirmText}</span>
          </button>
        )}
        <button
          onClick={() => {
            // open delete note modal
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

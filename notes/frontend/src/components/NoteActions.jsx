import deleteIcon from "../assets/images/icon-delete.svg";
import archive from "../assets/images/icon-archive.svg";
import archiveButton from "../assets/images/icon-archive.svg";
import restore from "../assets/images/icon-restore.svg";
import "../components/NoteActions.css";

function NoteActions({
  openModal,
  selectedNote,
  actionFunc,
  archiveNote,
  deleteNote,
}) {
  const updateAction = (action) => {
    actionFunc(action);
  };

  const confirmText = selectedNote?.archived ? "Restore Note" : "Archive Note";
  const confirmIcon = selectedNote?.archived ? restore : archive;

  return (
    <div className="note-actions">
      <button
        onClick={() => {
          openModal({
            title: "Archive Note",
            body: "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
            image: archiveButton,
            confirmText: confirmText,
            actionFunc: archiveNote,
          });
        }}
        className="action-button"
      >
        <img className="icon" src={confirmIcon} alt="" />
        <span>{confirmText}</span>
      </button>
      <button
        onClick={() => {
          openModal({
            title: "Delete Note",
            body: "Are you sure you want to permanently delete this note? This action cannot be undone.",
            image: deleteIcon,
            confirmText: "Delete Note",
            actionFunc: deleteNote,
          });
        }}
        className="danger action-button"
      >
        <img className="icon" src={deleteIcon} alt="" />
        <span>Delete Note </span>
      </button>
    </div>
  );
}

export default NoteActions;

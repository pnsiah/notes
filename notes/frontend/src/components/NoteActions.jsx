import deleteIcon from "../assets/images/icon-delete.svg";
import archive from "../assets/images/icon-archive.svg";
import archiveButton from "../assets/images/icon-archive.svg";
import "../components/NoteActions.css";

function NoteActions({ openModal, actionFunc, archiveNote, deleteNote }) {
  const updateAction = (action) => {
    actionFunc(action);
  };

  return (
    <div className="note-actions">
      <button
        onClick={() => {
          openModal({
            title: "Archive Note",
            body: "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
            image: archiveButton,
            confirmText: "Archive Note",
            actionFunc: archiveNote,
          });
        }}
        className="action-button"
      >
        <img className="icon" src={archive} alt="" />
        <span>Archive Note</span>
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

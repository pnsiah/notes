import deleteIcon from "../assets/images/icon-delete.svg";
import archive from "../assets/images/icon-archive.svg";
import archiveButton from "../assets/images/icon-archive.svg";
import restore from "../assets/images/icon-restore.svg";
import back from "../assets/images/icon-arrow-left.svg";
import "../components/NoteActions.css";

function NoteActions({
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
    </div>
  );
}

export default NoteActions;

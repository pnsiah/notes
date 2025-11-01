import deleteIcon from "../assets/images/icon-delete.svg";
import archive from "../assets/images/icon-archive.svg";

function NoteActions() {
  return (
    <div className="note-actions">
      <button className="danger action-button">
        <img src={deleteIcon} alt="" />
        <span>Delete Note </span>
      </button>
      <button className="action-button">
        <img src={archive} alt="" />
        <span>Archive Note</span>{" "}
      </button>
    </div>
  );
}

export default NoteActions;

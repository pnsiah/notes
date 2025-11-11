import deleteIcon from "../assets/images/icon-delete.svg";
import archive from "../assets/images/icon-archive.svg";
import "../components/NoteActions.css";

function NoteActions() {
  return (
    <div className="note-actions">
      <button className="action-button">
        <img className="icon" src={archive} alt="" />
        <span>Archive Note</span>{" "}
      </button>
      <button className="danger action-button">
        <img className="icon" src={deleteIcon} alt="" />
        <span>Delete Note </span>
      </button>
    </div>
  );
}

export default NoteActions;

import "../components/Modal.css";
import deleteIcon from "../assets/images/icon-delete.svg";

function Modal({ modalTitle, modalImage, body, confirmBtnMessage }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-content">
          {/* <img src={modalImage} alt="" /> */}
          <img src={deleteIcon} alt="" />
          <div className="modal-text">
            {/* <h3>{modalTitle}</h3> */}
            <h3>Title</h3>
            {/* <p>{body}</p> */}
            <p>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="modal-button modal-cancel">Cancel</button>
          <button className="modal-button modal-confirm">Confirm</button>
          {/* <button>{confirmBtnMessage}</button> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;

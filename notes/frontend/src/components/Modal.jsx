import "../components/Modal.css";
import deleteIcon from "../assets/images/icon-delete.svg";

function Modal({ closeModal, modalTitle, modalImage, modalBody, confirmText }) {
  const closeOnBackdrop = () => {
    closeModal();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={closeOnBackdrop}>
      <div className="modal" onClick={stopPropagation}>
        <div className="modal-content">
          <img src={modalImage} alt="" />
          <div className="modal-text">
            <h3>{modalTitle}</h3>
            <p>{modalBody}</p>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="modal-button modal-cancel" onClick={closeModal}>
            Cancel
          </button>
          <button
            className={`modal-button ${confirmText === "Delete Note" ? "modal-danger-button" : "modal-confirm"}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

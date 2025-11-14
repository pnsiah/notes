function Modal({ modalTitle, modalImage, body, confirmBtnMessage }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-text">
          <img src={modalImage} alt="" />
          <div>
            <h3>{modalTitle}</h3>
            <p>{body}</p>
          </div>
        </div>

        <div className="modal-buttons">
          <button>Cancel</button>
          <button>{confirmBtnMessage}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import "../components/Modal.css";
import { useState } from "react";

function Modal({
  closeModal,
  modalData,
  archiveNote,
  deleteNote,
  createFolder,
}) {
  const [folderName, setFolderName] = useState("");
  const { type, title, image, confirmText, payload } = modalData;

  const renderModalBody = (type) => {
    // render modal body based on modal type
    switch (type) {
      case "delete-note":
        return (
          <p>
            Are you sure you want to permanently delete this note? This action
            cannot be undone.
          </p>
        );

      case "archive-note":
        return (
          <p>
            Are you sure you want to archive this note? You can find it in the
            Archived Notes section and restore it anytime.
          </p>
        );

      case "restore-note":
        return (
          <p>
            Are you sure you want to restore this note? This note will be
            restored to All Notes section.
          </p>
        );

      case "create-folder":
        return (
          <input
            className="create-folder-input"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
            autoFocus
          />
        );

      default:
        return null;
    }
  };

  const handleConfirm = () => {
    // Perform the appropriate action based on modal type
    if (!modalData) return;

    switch (modalData.type) {
      case "delete-note":
        deleteNote(payload.noteId);
        break;

      case "archive-note":
        archiveNote(payload.noteId);
        break;

      case "restore-note":
        archiveNote(payload.noteId);
        break;

      case "create-folder":
        if (!folderName.trim()) return;
        createFolder(folderName);
        break;

      default:
        console.warn("Unknown modal type:", modalData.type);
    }

    closeModal();
  };

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
          <img src={image} alt="" />
          <div className="modal-text">
            <h3 className="modal-title">{title}</h3>
            <div className="modal-body">{renderModalBody(type)}</div>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="modal-button modal-cancel" onClick={closeModal}>
            Cancel
          </button>
          <button
            className={`modal-button ${confirmText === "Delete Note" ? "modal-danger-button" : "modal-confirm"}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

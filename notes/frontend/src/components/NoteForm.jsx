import { useState, useContext, useEffect } from "react";
import tag from "../assets/images/icon-tag.svg";
import infoIcon from "../assets/images/icon-info.svg";
import clock from "../assets/images/icon-clock.svg";
import "../components/NoteForm.css";
import folderIcon from "../assets/images/folder-regular-full.svg";
import { NotificationContext } from "./NotificationContext";

function NoteForm({ selectedNote, userFolders, createNote, updateNote }) {
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [warnings, setWarnings] = useState({
    title: false,
    content: false,
  });

  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setFolder(selectedNote.folder || "");
      setContent(selectedNote.content || "");
      setLastEdited(selectedNote.last_edited);
      setTags((selectedNote.tags || []).join(", "));
      setWarnings({ title: false, content: false });
    } else {
      setTitle("");
      setFolder("");
      setTags("");
      setContent("");
      setLastEdited("Not saved yet");
    }
  }, [selectedNote]);

  const validateField = (field, value) => {
    setWarnings((prev) => ({ ...prev, [field]: !value.trim() }));
  };

  const handleChange = (field, value, setter) => {
    setter(value);
    setWarnings((prev) => ({ ...prev, [field]: false })); // remove warning
  };

  const resetForm = () => {
    setTitle("");
    setFolder("");
    setTags("");
    setContent("");
    setLastEdited("Not saved yet");
    setWarnings({ title: false, content: false });
  };

  const cleanTags = (input) => {
    return input
      .split(/\s*,\s*/)
      .filter(Boolean)
      .map((tag) => tag.toLowerCase());
  };

  const validateNote = () => {
    const isTitleEmpty = !title.trim();
    const isContentEmpty = !content.trim();

    setWarnings({ title: isTitleEmpty, content: isContentEmpty });

    return !isTitleEmpty && !isContentEmpty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateNote()) {
      return;
    }

    const noteData = {
      title,
      folder,
      content,
      // lastEdited,
      tags: cleanTags(tags),
    };

    // decide whether to create or update
    // const success = selectedNote
    //   ? await updateNote(selectedNote.id, noteData)
    //   : await createNote(noteData);
    //
    // if (success) resetForm();
    if (selectedNote) {
      updateNote(selectedNote.id, noteData);
    } else {
      createNote(noteData);
    }
  };

  return (
    <div className="create-note">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleChange("title", e.target.value, setTitle)}
          value={title}
          className="title"
          placeholder="Enter a title..."
          onBlur={() => validateField("title", title)}
        />
        {warnings.title && (
          <div className="warning">
            <img src={infoIcon} alt="" />
            <p>Can't be empty</p>
          </div>
        )}

        <section className="form-divider">
          <div className="note-inputs">
            <div className="left">
              <img src={tag} alt="" />
              <p className="left-text">Tags</p>
            </div>
            <div className="right">
              <input
                type="text"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
              />
            </div>
          </div>
          <div className="note-inputs">
            <div className="left">
              <img className="folder-icon" src={folderIcon} alt="" />
              <p className="left-text">Folder</p>
            </div>
            <div className="right">
              <select
                value={folder}
                onChange={(e) => setFolder(Number(e.target.value))}
              >
                <option className="select-placeholder" value="" disabled>
                  Select a folder
                </option>
                {userFolders.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="note-inputs">
            <div className="left">
              <img src={clock} alt="" />
              <p className="left-text">
                Last
                <span>Edited</span>
              </p>
            </div>
            <div className="right">
              <input
                className="date-input"
                readOnly
                type="text"
                value={lastEdited}
              />
            </div>
          </div>
        </section>
        <textarea
          className="note-content"
          type="text"
          onChange={(e) => handleChange("content", e.target.value, setContent)}
          value={content}
          placeholder="Start typing your note here"
          onBlur={() => validateField("content", content)}
        />

        {warnings.content && (
          <div className="warning content-warning">
            <img src={infoIcon} alt="" />
            <p>Can't be empty</p>
          </div>
        )}
        <div className="note-buttons">
          <button
            // onClick={handleSubmit}
            className="note-button save"
            type="submit"
          >
            Save Note
          </button>
          <button
            onClick={resetForm}
            className="note-button cancel"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;

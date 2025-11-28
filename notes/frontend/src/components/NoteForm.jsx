import { useState, useContext, useEffect } from "react";
import tag from "../assets/images/icon-tag.svg";
import clock from "../assets/images/icon-clock.svg";
import "../components/NoteForm.css";
import folderIcon from "../assets/images/folder-regular-full.svg";
import { NotificationContext } from "./NotificationContext";

function NoteForm({ selectedNote }) {
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setFolder(selectedNote.folder || "");
      setContent(selectedNote.content || "");
      setLastEdited(selectedNote.last_edited);
      setTags((selectedNote.tags || []).join(", "));
    } else {
      setTitle("");
      setFolder("");
      setTags("");
      setContent("");
      setTags("");
      setLastEdited("Not saved yet");
    }
  }, [selectedNote]);

  const handleClick = () => {
    addNotification("hello");
  };

  const cleanTags = (input) => {
    return input
      .split(/\s*,\s*/)
      .filter(Boolean)
      .map((tag) => tag.toLowerCase());
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:8000/api/create_note/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         title: title,
  //         tags: cleanTags(tags),
  //         content: content,
  //       }),
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //
  const handleSubmit = () => {
    noteData = {
      title,
      folder,
      content,
      // lastEdited,
      tags: cleanTags(tags),
    };

    // decide whether to create or update
    if ((selectedNote.id, noteData)) {
      updateNote(selectedNote, noteData);
    } else {
      createNote(noteData);
    }
  };

  return (
    <div className="create-note">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="title"
          placeholder="Enter a title..."
        />
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
              <select defaultValue="">
                <option className="select-placeholder" value="" disabled>
                  Select a folder
                </option>
                <option
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                >
                  Name
                </option>
                <option value="Naem">Name</option>
                <option value="wah">Name</option>
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
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Start typing your note here"
        />
        <div className="note-buttons">
          <button className="note-button save" type="submit">
            Save Note
          </button>
          <button className="note-button cancel" type="submit">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;

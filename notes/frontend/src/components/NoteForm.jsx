import { useState } from "react";
import tag from "../assets/images/icon-tag.svg";
import clock from "../assets/images/icon-clock.svg";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const cleanTags = (input) => {
    return input
      .split(/\s*,\s*/)
      .filter(Boolean)
      .map((tag) => tag.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/create_note/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          tags: cleanTags(tags),
          content: content,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
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
              <img src={clock} alt="" />
              <p className="left-text">
                Last
                <span>Edited</span>
              </p>
            </div>
            <div className="right">
              <input type="text" placeholder="Not yet saved" />
            </div>
          </div>
        </section>
        <textarea
          className="content"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Start typing your note here"
        />
        <div className="note-buttons">
          <button className="save" type="submit">
            Save Note
          </button>
          <button className="cancel" type="submit">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;

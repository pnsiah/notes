import { useState } from "react";

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
          placeholder="Title"
        />
        <input
          type="text"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          placeholder="Tags"
        />
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Content"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NoteForm;

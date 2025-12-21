import { useEffect } from "react";
import NoteList from "./NoteList";
import Notes from "./Notes";
import "./TaggedNotes.css";

function TaggedNotes({
  setSelectedFilter,
  selectedTag,
  setSelectedTag,
  getNotesByTags,
  notes,
  selectedNote,
  setView,
  view,
  fetchSingleNote,
  setSelectedNote,
}) {
  useEffect(() => {
    if (!selectedTag) return;
    getNotesByTags(selectedTag);
    console.log({ selectedTag });
  }, [selectedTag]);

  // const notes = [
  //   {
  //     id: 1,
  //     title: "Learn Django ORM",
  //     content: "Understand filter(), exclude(), and Q objects.",
  //     tags: ["django", "backend"],
  //     archived: false,
  //     created_at: "2025-01-10",
  //   },
  //   {
  //     id: 2,
  //     title: "React Notes App",
  //     content: "Implement tag filtering and search debounce.",
  //     tags: ["react", "frontend"],
  //     archived: false,
  //     created_at: "2025-01-12",
  //   },
  //   {
  //     id: 3,
  //     title: "Neovim Setup",
  //     content: "Configure Lazy.nvim and Blink completion.",
  //     tags: ["neovim", "tools"],
  //     archived: false,
  //     created_at: "2025-01-15",
  //   },
  //   {
  //     id: 4,
  //     title: "Archived Idea",
  //     content: "Old project idea that is no longer active.",
  //     tags: ["ideas"],
  //     archived: true,
  //     created_at: "2024-12-20",
  //   },
  // ];
  return (
    <div className="taggedNotes">
      <h3>Tagged Notes: "{selectedTag}"</h3>
      <div>
        <NoteList
          selectedNote={selectedNote}
          setView={setView}
          notes={notes}
          fetchSingleNote={fetchSingleNote}
          hasFetched={false}
        />
      </div>
    </div>
  );
}

export default TaggedNotes;

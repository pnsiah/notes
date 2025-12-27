import { useEffect } from "react";
import TagList from "./TagList";
import FolderList from "./FolderList";
import Logo from "./Logo";
import home from "../assets/images/icon-home.svg";
import archived from "../assets/images/icon-archive.svg";
import arrow_right from "../assets/images/icon-chevron-right.svg";
import tag from "../assets/images/icon-tag.svg";
import "./SideBar.css";

function Sidebar({
  setHeading,
  getNotesByFolder,
  setSelectedFolder,
  setSearchQuery,
  setHighlight,
  highlight,
  goToAllNotes,
  goToArchivedNotes,
  setView,
  selectedTag,
  setSelectedTag,
  getNotesByTag,
  selectedFilter,
  setSelectedFilter,
  folders,
  tags,
  fetchNotes,
}) {
  const DATA_FETCHING_VIEWS = ["all", "archived"];

  useEffect(() => {
    if (!DATA_FETCHING_VIEWS.includes(selectedFilter)) return;
    fetchNotes(selectedFilter);
    console.log("Effect and selected filter:", selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="sidebar">
      <Logo />
      <div className="menu-links">
        <button
          onClick={() => {
            goToAllNotes();
          }}
          className={`sidebar-button ${highlight === "all" ? "highlight" : ""}`}
        >
          <img className="home" src={home} alt="" />
          <span className="menu-text">All Notes</span>
          <img className="arrow-right" src={arrow_right} alt="" />
        </button>
        <button
          onClick={() => {
            goToArchivedNotes();
          }}
          className={`sidebar-button ${highlight === "archived" ? "highlight" : ""}`}
        >
          <img className="archived-icon" src={archived} alt="" />
          <span className="menu-text">Archived Notes</span>
          <img className="arrow-right" src={arrow_right} alt="" />
        </button>
      </div>
      <div className="list-container">
        <TagList
          setHeading={setHeading}
          setSelectedFilter={setSelectedFilter}
          setHighlight={setHighlight}
          setView={setView}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          getNotesByTag={getNotesByTag}
          tags={tags}
        />
        <FolderList
          setHeading={setHeading}
          setSelectedFilter={setSelectedFilter}
          setView={setView}
          setHighlight={setHighlight}
          setSelectedFolder={setSelectedFolder}
          getNotesByFolder={getNotesByFolder}
          folders={folders}
        />
      </div>
    </div>
  );
}

export default Sidebar;

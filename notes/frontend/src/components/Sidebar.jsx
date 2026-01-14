import { useEffect } from "react";
import TagList from "./TagList";
import FolderList from "./FolderList";
import Logo from "./Logo";
import homeIcon from "../assets/images/icon-home.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import arrow_right from "../assets/images/icon-chevron-right.svg";
import "./SideBar.css";

function Sidebar({
  setHeading,
  setSelectedFolder,
  setHighlight,
  highlight,
  goToAllNotes,
  goToArchivedNotes,
  setView,
  setSelectedTag,
  selectedFilter,
  setSelectedFilter,
  folders,
  tags,
  fetchNotes,
}) {
  const DATA_FETCHING_VIEWS = ["all", "archived"];

  useEffect(() => {
    // Fetch notes when the selected filter is "all" or "archived"
    if (!DATA_FETCHING_VIEWS.includes(selectedFilter)) return;
    fetchNotes(selectedFilter);
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
          <img className="home" src={homeIcon} alt="" />
          <span className="menu-text">All Notes</span>
          <img className="arrow-right" src={arrow_right} alt="" />
        </button>
        <button
          onClick={() => {
            goToArchivedNotes();
          }}
          className={`sidebar-button ${highlight === "archived" ? "highlight" : ""}`}
        >
          <img className="archived-icon" src={archiveIcon} alt="" />
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
          setSelectedTag={setSelectedTag}
          tags={tags}
        />
        <FolderList
          setHeading={setHeading}
          setSelectedFilter={setSelectedFilter}
          setView={setView}
          setHighlight={setHighlight}
          setSelectedFolder={setSelectedFolder}
          folders={folders}
        />
      </div>
    </div>
  );
}

export default Sidebar;

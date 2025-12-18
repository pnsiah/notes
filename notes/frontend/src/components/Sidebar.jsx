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
  setHighlight,
  highlight,
  setView,
  selectedTag,
  setSelectedTag,
  getNotesByTags,
  selectedFilter,
  setSelectedFilter,
  folders,
  tags,
  fetchNotes,
}) {
  useEffect(() => {
    fetchNotes(selectedFilter);
    console.log("Effect:", selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="sidebar">
      <Logo />
      {/* <div className="sidebar-logo"></div> */}
      <div className="menu-links">
        <button
          onClick={() => {
            setSelectedFilter("all");
            // setView("all");
            setHighlight("all");
          }}
          className={`sidebar-button ${highlight === "all" ? "highlight" : ""}`}
        >
          <img className="home" src={home} alt="" />
          <span className="menu-text">All Notes</span>
          <img className="arrow-right" src={arrow_right} alt="" />
        </button>
        <button
          onClick={() => {
            setSelectedFilter("archived");
            // setView("archived");
            setHighlight("archived");
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
          setHighlight={setHighlight}
          setView={setView}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          getNotesByTags={getNotesByTags}
          tags={tags}
        />
        <FolderList folders={folders} />
      </div>
    </div>
  );
}

export default Sidebar;

import TagList from "./TagList";
import FolderList from "./FolderList";
import Logo from "./Logo";
import home from "../assets/images/icon-home.svg";
import archived from "../assets/images/icon-archive.svg";
import arrow_right from "../assets/images/icon-chevron-right.svg";
import tag from "../assets/images/icon-tag.svg";
import "./SideBar.css";

function Sidebar({ folders, tags, fetchArchivedNotes }) {
  return (
    <div className="sidebar">
      <Logo />
      {/* <div className="sidebar-logo"></div> */}
      <div className="menu-links">
        <button className="sidebar-button">
          <img className="home" src={home} alt="" />{" "}
          <span className="menu-text">All Notes</span>
          <img className="arrow-right" src={arrow_right} alt="" />
        </button>
        <button onClick={fetchArchivedNotes} className="sidebar-button">
          <img className="archived-icon" src={archived} alt="" />
          <span className="menu-text">Archived Notes</span>
          <img className="arrow-right" src={arrow_right} alt="" />
        </button>
      </div>
      <div className="list-container">
        <TagList tags={tags} />
        <FolderList folders={folders} />
      </div>

      {/* <section className="tags"> */}
      {/*   <h3 className="tags-heading">Folders</h3> */}
      {/*   <p className="tag"> */}
      {/*     <img src={tag} alt="" /> <span className="tag-text">Tags</span> */}
      {/*   </p> */}
      {/**/}
      {/*   <p className="tag"> */}
      {/*     <img src={tag} alt="" /> <span className="tag-text">Element</span> */}
      {/*   </p> */}
      {/*   <p className="tag"> */}
      {/*     <img src={tag} alt="" /> <span className="tag-text">React</span> */}
      {/*   </p> */}
      {/* </section> */}
    </div>
  );
}

export default Sidebar;

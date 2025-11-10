import folderIcon from "../assets/images/folder-regular-full.svg";
import "../components/TagList.css";
import "../components/FolderList.css";
import arrow_right from "../assets/images/icon-chevron-right.svg";

function FolderList() {
  return (
    <section className="folders">
      <h3 className="section-heading">Folders</h3>
      <ul className="folder-list">
        <li>
          <button className="folder">
            <img src={folderIcon} alt="" />{" "}
            <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="folder">
            <img src={folderIcon} alt="" />{" "}
            <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="folder">
            <img src={folderIcon} alt="" />{" "}
            <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="folder">
            <img src={folderIcon} alt="" />{" "}
            <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="folder">
            <img src={folderIcon} alt="" />{" "}
            <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="folder">
            <img src={folderIcon} alt="" />{" "}
            <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
      </ul>
    </section>
  );
}

export default FolderList;

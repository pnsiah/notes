import folderIcon from "../assets/images/folder-regular-full.svg";
import "../components/TagList.css";
import "../components/FolderList.css";

function FolderList() {
  return (
    <section className="folders">
      <h3 className="section-heading">Folders</h3>
      <ul className="folder-list">
        <li className="folder">
          <img src={folderIcon} alt="" /> <span className="tag-text">Tags</span>
        </li>

        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">Element</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>

        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>

        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>

        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">React</span>
        </li>
        <li className="folder">
          <img src={folderIcon} alt="" />
          <span className="tag-text">Learn</span>
        </li>
      </ul>
    </section>
  );
}

export default FolderList;

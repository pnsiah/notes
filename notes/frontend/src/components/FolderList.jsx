import folderIcon from "../assets/images/folder-regular-full.svg";
import "../components/TagList.css";
import "../components/FolderList.css";
import arrow_right from "../assets/images/icon-chevron-right.svg";

function FolderList({ folders }) {
  return (
    <section className="folders">
      <h3 className="section-heading">Folders</h3>
      <ul className="folder-list">
        {folders.map((folder) => (
          <li key={folder.id}>
            <button className="folder">
              <img src={folderIcon} alt="" />
              <span className="tag-text">{folder.name}</span>
              <img className="arrow-right" src={arrow_right} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FolderList;

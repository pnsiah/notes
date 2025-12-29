import folderIcon from "../assets/images/folder-regular-full.svg";
import "../components/TagList.css";
import "../components/FolderList.css";
import arrow_right from "../assets/images/icon-chevron-right.svg";

function FolderList({
  setHeading,
  folders,
  setSelectedFolder,
  setView,
  setHighlight,
  setSelectedFilter,
}) {
  const fetchFolderNotes = (folder) => {
    setSelectedFolder({ id: folder.id, name: folder.name });
    setView("folderNotes");
    setHighlight("");
    setSelectedFilter("folderNotes");
    setHeading(`Folder: ${folder.name}`);
  };

  return (
    <section className="folders">
      <h3 className="section-heading">Folders</h3>
      <ul className="folder-list">
        {folders.length === 0 ? (
          <li className="empty-folder-message">
            No folders available. Create a new folder to get started.
          </li>
        ) : (
          folders.map((folder) => (
            <li key={folder.id} onClick={() => fetchFolderNotes(folder)}>
              <button className="folder">
                <img src={folderIcon} alt="" />
                <span className="tag-text">{folder.name}</span>
                <img className="arrow-right" src={arrow_right} alt="" />
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default FolderList;

import searchIcon from "../assets/images/icon-search.svg";
import settingsIcon from "../assets/images/icon-settings.svg";
import "../components/Search.css";

function Search({ searchNotes }) {
  console.log(typeof searchNotes);
  return (
    <form className="search-form">
      <div className="input-wrapper">
        <input
          onChange={(e) => searchNotes(e.target.value)}
          className="search-input"
          type="text"
          placeholder="Search by title, tags or folder"
        />
        <span className="search-icon">
          <img src={searchIcon} alt="" />
        </span>
      </div>
      <div className="settings-icon">
        <img src={settingsIcon} alt="" />
      </div>
      <p className="search-info">All notes matching are displayed here.</p>
    </form>
  );
}

export default Search;

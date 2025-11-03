import settings from "../assets/images/icon-settings.svg";
function Search() {
  return (
    <div className="search-form">
      <form>
        <input
          className="search"
          type="text"
          placeholder="Search by title, tags or folder"
        />
        <p className="search-info">All notes matching are displayed here.</p>
      </form>
      <span className="settings">
        <img src={settings} alt="" />
      </span>
    </div>
  );
}

export default Search;

import { useRef, useEffect } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import settingsIcon from "../assets/images/icon-settings.svg";
import "../components/Search.css";

function Search({
  setEmptyState,
  fetchNotes,
  searchNotes,
  setNotesInfoMessage,
}) {
  const debounceRef = useRef(null);

  const handleSearch = (query) => {
    if (!query.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      fetchNotes();
      setNotesInfoMessage("");
      setEmptyState({ isEmpty: false });
      return;
    }

    debounceRef.current = setTimeout(() => {
      searchNotes(query);
      setNotesInfoMessage(`All notes matching "${query}" are displayed here.`);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <form className="search-form">
      <div className="input-wrapper">
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
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
    </form>
  );
}

export default Search;

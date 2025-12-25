import { useRef, useEffect } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import settingsIcon from "../assets/images/icon-settings.svg";
import "../components/Search.css";

function Search({
  setEmptyState,
  fetchNotes,
  setSearchQuery,
  searchQuery,
  searchNotes,
  setNotesInfoMessage,
}) {
  const debounceRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchQuery || !searchQuery.trim()) {
      fetchNotes();
      setNotesInfoMessage("");
      // setEmptyState({ isEmpty: false });
      return;
    }

    debounceRef.current = setTimeout(() => {
      searchNotes(searchQuery);
      setNotesInfoMessage(
        `All notes matching "${searchQuery}" are displayed here.`,
      );
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  return (
    <form className="search-form">
      <div className="input-wrapper">
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          value={searchQuery}
          className="search-input"
          type="text"
          placeholder="Search by title, tags or folder"
        />
        <span className="search-icon">
          <img src={searchIcon} alt="" />
        </span>
      </div>
    </form>
  );
}

export default Search;

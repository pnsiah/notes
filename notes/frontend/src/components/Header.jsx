import Search from "./Search";
import Logo from "./Logo";
import "../components/Header.css";

function Header({
  fetchNotes,
  setEmptyState,
  setNotesInfoMessage,
  searchQuery,
  setSearchQuery,
  searchNotes,
  showSearch = true,
  showLogo = false,
}) {
  return (
    <header className="header">
      {showLogo && <Logo />}
      <h2 className="header-text">Heading</h2>
      {showSearch && (
        <Search
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          fetchNotes={fetchNotes}
          setEmptyState={setEmptyState}
          setNotesInfoMessage={setNotesInfoMessage}
          searchNotes={searchNotes}
        />
      )}
    </header>
  );
}

export default Header;

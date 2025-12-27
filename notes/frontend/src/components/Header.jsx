import Search from "./Search";
import Logo from "./Logo";
import "../components/Header.css";

function Header({
  heading,
  // setSearchQuery,
  // searchQuery,
  // fetchNotes,
  // setEmptyState,
  // setNotesInfoMessage,
  // searchNotes,
  // showSearch = true,
  // showLogo = false,
}) {
  return (
    <header className="header">
      <h2 className="header-text">{heading}</h2>
    </header>
  );
}

export default Header;

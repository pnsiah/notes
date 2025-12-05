import Search from "./Search";
import Logo from "./Logo";
import "../components/Header.css";

function Header({
  setNotesInfoMessage,
  searchNotes,
  showSearch = true,
  showLogo = false,
}) {
  // console.log("search", typeof searchNotes);
  return (
    <header className="header">
      {showLogo && <Logo />}
      <h2 className="header-text">Heading</h2>
      {showSearch && (
        <Search
          setNotesInfoMessage={setNotesInfoMessage}
          searchNotes={searchNotes}
        />
      )}
    </header>
  );
}

export default Header;

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
      {/* {showLogo && <Logo />} */}
      <h2 className="header-text">{heading}</h2>
      {/* {showSearch && ( */}
      {/*   <Search */}
      {/*     setSearchQuery={setSearchQuery} */}
      {/*     searchQuery={searchQuery} */}
      {/*     fetchNotes={fetchNotes} */}
      {/*     setEmptyState={setEmptyState} */}
      {/*     setNotesInfoMessage={setNotesInfoMessage} */}
      {/*     searchNotes={searchNotes} */}
      {/*   /> */}
      {/* )} */}
    </header>
  );
}

export default Header;

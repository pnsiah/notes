import Search from "./Search";
import settings from "../assets/images/icon-settings.svg";
import Logo from "./Logo";
import "../components/Header.css";
function Header({ showSearch = true, showLogo = false }) {
  return (
    <header className="header">
      {showLogo && <Logo />}
      <h2 className="header-text">Heading</h2>
      {showSearch && <Search></Search>}
    </header>
  );
}

export default Header;

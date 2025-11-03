import Search from "./Search";
import settings from "../assets/images/icon-settings.svg";
import Logo from "./Logo";
function Header() {
  return (
    <div className="header">
      <Logo />
      <h2 className="header-text">Heading</h2>
      <Search></Search>
    </div>
  );
}

export default Header;

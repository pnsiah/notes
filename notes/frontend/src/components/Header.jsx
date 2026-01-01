import Search from "./Search";
import "../components/Header.css";

function Header({ heading }) {
  return (
    <header className="header">
      <h2 className="header-text">{heading}</h2>
    </header>
  );
}

export default Header;

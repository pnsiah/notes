import NavItem from "./NavItem";
import home from "../assets/images/icon-home.svg";
import archive from "../assets/images/icon-archive.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import search from "../assets/images/icon-search.svg";
import settings from "../assets/images/icon-settings.svg";
import folderIcon from "../assets/images/folder-open-regular-full.svg";
import "../components/NavBar.css";

function NavBar({ view, setView }) {
  const navItems = [
    { id: "all", icon: home },
    { id: "archived", icon: archive },
    { id: "tags", icon: tagIcon },
    { id: "search", icon: search },
    { id: "settings", icon: settings },
    { id: "folders", icon: folderIcon },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            view={view}
            setView={setView}
          />
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;

import NavItem from "./NavItem";
import homeIcon from "../assets/images/icon-home.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import search from "../assets/images/icon-search.svg";
import folderIcon from "../assets/images/folder-open-regular-full.svg";
import "../components/NavBar.css";

function NavBar({ view, setView, setHeading }) {
  const navItems = [
    { id: "all", icon: homeIcon },
    { id: "archived", icon: archiveIcon },
    { id: "tags", icon: tagIcon },
    { id: "search", icon: search },
    { id: "folders", icon: folderIcon },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <NavItem
            setHeading={setHeading}
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

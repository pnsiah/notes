import "../components/NavItem.css";
function NavItem({ id, icon, view, setView, setHeading }) {
  const isActive = view === id;

  return (
    <li className="nav-item">
      <button
        className={`nav-button ${isActive ? "active" : ""}`}
        onClick={() => {
          setView(id);
          setHeading(id.charAt(0).toUpperCase() + id.slice(1).toLowerCase());
        }}
      >
        <img src={icon} alt={`${id} icon`} />
      </button>
    </li>
  );
}

export default NavItem;

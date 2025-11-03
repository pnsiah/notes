import "../components/NavItem.css";
function NavItem({ id, icon, view, setView }) {
  const isActive = view === id;

  return (
    <li className="nav-item">
      <button
        className={`nav-button ${isActive ? "active" : ""}`}
        onClick={() => setView(id)}
      >
        <img src={icon} alt={`${id} icon`} />
      </button>
    </li>
  );
}

export default NavItem;

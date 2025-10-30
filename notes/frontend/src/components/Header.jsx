import settings from "../assets/images/icon-settings.svg";
function Header() {
  return (
    <div className="header">
      <h2>Heading</h2>
      <div className="search-form">
        <form>
          <input
            className="search"
            type="text"
            placeholder="Search by title, tags or folder"
          />
        </form>
        <span className="settings">
          <img src={settings} alt="" />
        </span>
      </div>
    </div>
  );
}

export default Header;

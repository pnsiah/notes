import home from "../assets/images/icon-home.svg";
import archive from "../assets/images/icon-archive.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import search from "../assets/images/icon-search.svg";
import settings from "../assets/images/icon-settings.svg";

function Footer({ setView, view }) {
  return (
    <div className="footer">
      <button
        className="footer-btn"
        onClick={() => {
          setView("notes");
          console.log(view);
        }}
      >
        <img src={home} alt="" />
      </button>
      <button
        className="footer-btn"
        onClick={() => {
          setView("archive");
          console.log(view);
        }}
      >
        <img src={archive} alt="" />
      </button>
      <button
        className="footer-btn"
        onClick={() => {
          setView("tags");
          console.log(view);
        }}
      >
        <img src={tagIcon} alt="" />
      </button>
      <button
        className="footer-btn"
        onClick={() => {
          setView("search");
          console.log(view);
        }}
      >
        <img src={search} alt="" />
      </button>
      <button
        className="footer-btn"
        onClick={() => {
          setView("settings");
          console.log(view);
        }}
      >
        <img src={settings} alt="" />
      </button>
    </div>
  );
}
export default Footer;

import home from "../assets/images/icon-home.svg";
import archive from "../assets/images/icon-archive.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import search from "../assets/images/icon-search.svg";
import settings from "../assets/images/icon-settings.svg";

function Footer() {
  return (
    <div className="footer">
      <button className="footer-btn">
        <img src={home} alt="" />
      </button>
      <button className="footer-btn">
        <img src={archive} alt="" />
      </button>
      <button className="footer-btn">
        <img src={tagIcon} alt="" />
      </button>
      <button className="footer-btn">
        <img src={search} alt="" />
      </button>
      <button className="footer-btn">
        <img src={settings} alt="" />
      </button>
    </div>
  );
}
export default Footer;

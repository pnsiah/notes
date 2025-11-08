import tag from "../assets/images/icon-tag.svg";
import "../components/TagList.css";
import arrow_right from "../assets/images/icon-chevron-right.svg";

function TagList() {
  return (
    <section className="tags">
      <h3 className="section-heading">Tags</h3>
      <ul className="tag-list">
        <li>
          <button className="tag">
            <img src={tag} alt="" /> <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>

        <li>
          <button className="tag">
            <img src={tag} alt="" /> <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="tag">
            <img src={tag} alt="" /> <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="tag">
            <img src={tag} alt="" /> <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="tag">
            <img src={tag} alt="" /> <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
        <li>
          <button className="tag">
            <img src={tag} alt="" /> <span className="tag-text">Tags</span>
            <img className="arrow-right" src={arrow_right} alt="" />
          </button>
        </li>
      </ul>
    </section>
  );
}

export default TagList;

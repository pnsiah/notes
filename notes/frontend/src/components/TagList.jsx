import tag from "../assets/images/icon-tag.svg";
import "../components/TagList.css";
function TagList() {
  return (
    <section className="tags">
      <h3 className="section-heading">Tags</h3>
      <ul className="tag-list">
        <li className="tag">
          <img src={tag} alt="" /> <span className="tag-text">Tags</span>
        </li>

        <li className="tag">
          <img src={tag} alt="" /> <span className="tag-text">Element</span>
        </li>
        <li className="tag">
          <img src={tag} alt="" /> <span className="tag-text">React</span>
        </li>
      </ul>
    </section>
  );
}

export default TagList;

import tag from "../assets/images/icon-tag.svg";
function TagList() {
  return (
    <section className="tags">
      <h3 className="tags-heading">Tags</h3>
      <p className="tag">
        <img src={tag} alt="" /> <span className="tag-text">Tags</span>
      </p>

      <p className="tag">
        <img src={tag} alt="" /> <span className="tag-text">Element</span>
      </p>
      <p className="tag">
        <img src={tag} alt="" /> <span className="tag-text">React</span>
      </p>
    </section>
  );
}

export default TagList;

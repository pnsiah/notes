import tagIcon from "../assets/images/icon-tag.svg";
import "../components/TagList.css";
import arrow_right from "../assets/images/icon-chevron-right.svg";

function TagList({
  setSelectedFilter,
  selectedTag,
  setHighlight,
  setView,
  setSelectedTag,
  tags,
  getNotesByTags,
}) {
  return (
    <section className="tags">
      <h3 className="section-heading">Tags</h3>
      <ul className="tag-list">
        {tags.map((tag) => (
          <li
            key={tag.id}
            onClick={() => {
              setSelectedTag({ id: tag.id, name: tag.name });
              setView("taggedNotes");
              setHighlight("");
              setSelectedFilter("taggedNotes");
            }}
          >
            <button className="tag">
              <img src={tagIcon} alt="" />
              <span className="tag-text">{tag.name}</span>
              <img className="arrow-right" src={arrow_right} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TagList;

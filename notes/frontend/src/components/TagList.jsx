import tagIcon from "../assets/images/icon-tag.svg";
import "../components/TagList.css";
import arrow_right from "../assets/images/icon-chevron-right.svg";

function TagList({
  setHeading,
  setSelectedFilter,
  setHighlight,
  setView,
  setSelectedTag,
  tags,
}) {
  const handleTagClick = (tag) => {
    // Switch UI to show notes for the selected tag
    setSelectedTag({ id: tag.id, name: tag.name });
    setView("taggedNotes");
    setHighlight("");
    setSelectedFilter("taggedNotes");
    setHeading(`Tagged Notes: ${tag.name}`);
  };

  return (
    <section className="tags">
      <h3 className="section-heading">Tags</h3>
      <ul className="tag-list">
        {tags.length === 0 ? (
          <li className="empty-tag-message">
            No tags available. Add some tags to organize your notes!
          </li>
        ) : (
          tags.map((tag) => (
            <li key={tag.id} onClick={() => handleTagClick(tag)}>
              <button className="tag">
                <img src={tagIcon} alt="" />
                <span className="tag-text">{tag.name}</span>
                <img className="arrow-right" src={arrow_right} alt="" />
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default TagList;

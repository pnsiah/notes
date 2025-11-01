import plus from "../assets/images/icon-plus.svg";
function Notes() {
  return (
    <div className="notes">
      <div className="note-list-container">
        <button className="new-note-btn">
          <img src={plus} alt="" /> <span>Create New Note</span>
        </button>
        <div className="notes-list">
          <div className="note">
            <h4>Title</h4>
            <div className="tags-section">
              <span>Tag</span>
              <span>Tag</span>
              <span>Tag</span>
            </div>
            <p className="date">30th October 2034</p>
          </div>

          <div className="note">
            <h4>Title</h4>
            <div className="tags-section">
              <span>Tag</span>
              <span>Tag</span>
              <span>Tag</span>
            </div>
            <p className="date">30th October 2034</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;

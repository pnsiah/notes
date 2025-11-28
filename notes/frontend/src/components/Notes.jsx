import plus from "../assets/images/icon-plus.svg";
import "../components/Notes.css";
import "../components/NoteList.css";
import NoteList from "./NoteList";

function Notes({ notes, fetchNote }) {
  return (
    <div className="notes">
      <div className="note-list-container">
        <button className="new-note-btn">
          <img src={plus} alt="" /> <span>Create New Note</span>
        </button>
        <NoteList notes={notes} fetchNote={fetchNote} />
        {/* <ul className="notes-list"> */}
        {/*   <li> */}
        {/*     <button className="note"> */}
        {/*       <h4 className="note-title">Title</h4> */}
        {/*       <div className="tags-section"> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*       </div> */}
        {/*       <p className="date">30th October 2034</p> */}
        {/*     </button> */}
        {/*   </li> */}
        {/*   <li> */}
        {/*     <button className="note"> */}
        {/*       <h4 className="note-title">Title</h4> */}
        {/*       <div className="tags-section"> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*       </div> */}
        {/*       <p className="date">30th October 2034</p> */}
        {/*     </button> */}
        {/*   </li> */}
        {/*   <li> */}
        {/*     <button className="note"> */}
        {/*       <h4 className="note-title">Title</h4> */}
        {/*       <div className="tags-section"> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span> */}
        {/*           Lorem ipsum dolor, sit amet consectetur adipisicing elit. */}
        {/*           Maiores repellat amet quas ad natus cum! */}
        {/*         </span> */}
        {/**/}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*       </div> */}
        {/*       <p className="date">30th October 2034</p> */}
        {/*     </button> */}
        {/*   </li> */}
        {/*   <li> */}
        {/*     <button className="note"> */}
        {/*       <h4 className="note-title">Title</h4> */}
        {/*       <div className="tags-section"> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*       </div> */}
        {/*       <p className="date">30th October 2034</p> */}
        {/*     </button> */}
        {/*   </li> */}
        {/*   <li> */}
        {/*     <button className="note"> */}
        {/*       <h4 className="note-title">Title</h4> */}
        {/*       <div className="tags-section"> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*         <span>Tag</span> */}
        {/*       </div> */}
        {/*       <p className="date">30th October 2034</p> */}
        {/*     </button> */}
        {/*   </li> */}
        {/* </ul> */}
      </div>
    </div>
  );
}

export default Notes;

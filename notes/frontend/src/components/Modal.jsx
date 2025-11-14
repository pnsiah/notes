import "../components/Modal.css";
import deleteIcon from "../assets/images/icon-delete.svg";

function Modal({ modalTitle, modalImage, body, confirmBtnMessage }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-text">
          {/* <img src={modalImage} alt="" /> */}
          <img src={deleteIcon} alt="" />
          <div>
            {/* <h3>{modalTitle}</h3> */}
            <h3>Title</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            quisquam veniam repellat impedit commodi deserunt? Iure repellendus
            eos neque architecto deleniti, ipsam voluptatum amet, totam
            consequuntur quis distinctio labore perferendis dolorem voluptates
            tempore mollitia dolore nisi dolores excepturi eligendi sequi
            aspernatur omnis pariatur! Et explicabo harum, deleniti non qui
            labore?
            <p>{body}</p>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="modal-button modal-cancel">Cancel</button>
          <button className="modal-button modal-confirm">Confirm</button>
          {/* <button>{confirmBtnMessage}</button> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;

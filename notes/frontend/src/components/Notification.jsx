import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";
import "./Notification.css";
import checkMark from "../assets/images/icon-checkmark.svg";
import close from "../assets/images/icon-cross.svg";

function Notification() {
  const { message, addNotification } = useContext(NotificationContext);

  const closeNotification = () => {
    addNotification("");
  };

  return message ? (
    <div className="notification">
      <img className="check-mark" src={checkMark} alt="" />
      <p>{message}</p>
      <button onClick={closeNotification} className="close">
        <img src={close} alt="" />
      </button>
    </div>
  ) : null;
}

export default Notification;

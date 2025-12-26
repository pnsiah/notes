import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";
import "./Notification.css";
import checkMark from "../assets/images/icon-checkmark.svg";
import close from "../assets/images/icon-cross.svg";
import errorIcon from "../assets/images/error.svg";

function Notification() {
  const { message, addNotification, isError, clearNotification } =
    useContext(NotificationContext);

  const closeNotification = () => {
    clearNotification;
  };

  if (!message) return null;

  const icon = isError ? errorIcon : checkMark;

  return (
    <div className="notification">
      <img className="icon" src={icon} alt="" />
      <p> {message}</p>
      <button onClick={closeNotification} className="close">
        <img src={close} alt="" />
      </button>
    </div>
  );
}

export default Notification;

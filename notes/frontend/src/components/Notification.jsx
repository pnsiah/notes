import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

function Notification() {
  const { message } = useContext(NotificationContext);
  return message ? <div>{message}</div> : null;
}

export default Notification;

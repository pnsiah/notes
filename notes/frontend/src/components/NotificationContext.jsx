import { useState, createContext } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");

  function addNotification(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <Notification.Provider value={{ message, addNotification }}>
      {children}
    </Notification.Provider>
  );
}

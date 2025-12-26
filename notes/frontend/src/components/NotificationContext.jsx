import { useState, createContext } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function addNotification(msg, error = false) {
    setMessage(msg);
    setIsError(error);

    setTimeout(() => {
      setMessage("");
      setIsError(false);
    }, 3000);
  }

  function clearNotification() {
    setMessage("");
    setIsError(false);
  }

  return (
    <NotificationContext.Provider
      value={{ message, addNotification, isError, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

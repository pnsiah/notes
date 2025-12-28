import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotificationProvider } from "./components/NotificationContext";
import Notification from "./components/Notification";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <Notification />
      <App />
    </NotificationProvider>
  </StrictMode>,
);

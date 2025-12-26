import { useState, useRef, useEffect } from "react";
import settingsIcon from "../assets/images/icon-settings.svg";
import "./Settings.css";

function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="settings-wrapper" ref={settingsRef}>
      <button
        className="settings-icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Settings"
      >
        <img src={settingsIcon} alt="" />
      </button>

      {isOpen && (
        <div className="settings-popup">
          <div className="settings-section">
            <p className="settings-label">Account</p>
            <button className="settings-item">
              <span className="item-icon">🔑</span>
              <span>Log in</span>
            </button>
          </div>

          <div className="settings-divider" />

          <div className="settings-section">
            <p className="settings-label">Appearance</p>
            <button className="settings-item">
              <span className="item-icon">🌗</span>
              <span>Toggle theme</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;

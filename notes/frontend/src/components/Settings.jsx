import { useState, useRef, useEffect } from "react";
import settingsIcon from "../assets/images/icon-settings.svg";
import profileIcon from "../assets/images/circle-user-solid-full.svg";
import "./Settings.css";

function Settings({ logOut, userName }) {
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
            <div className="settings-divider" />
            <button className="settings-item">
              <img src={profileIcon} className=" profile-icon item-icon" />
              <span>{userName}</span>
            </button>
            <button onClick={logOut} className="settings-item">
              <span className="item-icon">🔑</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;

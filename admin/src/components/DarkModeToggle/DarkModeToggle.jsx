import React, { useContext } from 'react';
import './DarkModeToggle.css';
import { DarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="dark-mode-toggle">
      <input
        type="checkbox"
        className="dark-mode-toggle-checkbox"
        id="dark-mode-toggle"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label className="dark-mode-toggle-label" htmlFor="dark-mode-toggle">
        <div className="dark-mode-toggle-inner">
          <div className="dark-mode-toggle-switch">
            {/* Sun icon for light mode */}
            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-15a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zM5 12a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H5zm15-1a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zM6.36 6.36a1 1 0 0 1 1.42 0l.7.7a1 1 0 1 1-1.4 1.42l-.72-.7a1 1 0 0 1 0-1.42zm11.46 11.46a1 1 0 0 1-1.42 0l-.7-.7a1 1 0 0 1 1.42-1.42l.7.7a1 1 0 0 1 0 1.42zM17.64 6.36a1 1 0 0 1 0 1.42l-.7.7a1 1 0 1 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0zM6.18 17.82a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0z" />
            </svg>
            
            {/* Moon icon for dark mode */}
            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27 C17.45,17.19,14.93,19,12,19c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9 c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4 C12.92,3.04,12.46,3,12,3L12,3z" />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
};

export default DarkModeToggle;

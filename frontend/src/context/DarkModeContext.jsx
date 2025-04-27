import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const DarkModeContext = createContext();

// Create a hook for using the dark mode
export function useDarkMode() {
  return useContext(DarkModeContext);
}

// Context Provider component
export const DarkModeProvider = ({ children }) => {
  // Check if dark mode was previously enabled
  const getInitialDarkMode = () => {
    // Check local storage first
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      return JSON.parse(savedDarkMode);
    }
    // Otherwise, check user's system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // State to track dark mode status
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Update body class and local storage when dark mode changes
  useEffect(() => {
    // Update the dark mode class on the body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Add a theme-color meta tag for mobile devices
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', darkMode ? '#121212' : '#ffffff');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = darkMode ? '#121212' : '#ffffff';
      document.head.appendChild(meta);
    }
  }, [darkMode]);

  // Context value
  const contextValue = {
    darkMode,
    toggleDarkMode
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

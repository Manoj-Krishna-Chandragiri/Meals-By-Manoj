import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

export const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export const DarkModeProvider = ({ children }) => {
  const getInitialDarkMode = () => {
    const savedDarkMode = localStorage.getItem('adminDarkMode');
    if (savedDarkMode !== null) {
      return JSON.parse(savedDarkMode);
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    localStorage.setItem('adminDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

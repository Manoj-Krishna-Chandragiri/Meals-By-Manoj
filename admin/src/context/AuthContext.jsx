import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Check if user is already logged in from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  // Login function using environment variables for credentials
  const login = (email, password) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (email === adminEmail && password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Persist authentication state in localStorage
  useEffect(() => {
    localStorage.setItem('adminAuth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Add session timeout functionality
  useEffect(() => {
    if (isAuthenticated) {
      const logoutTimer = setTimeout(() => {
        toast.info("Your session has expired. Please login again.");
        logout();
      }, 3600000); // 1 hour timeout
      
      return () => clearTimeout(logoutTimer);
    }
  }, [isAuthenticated, logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

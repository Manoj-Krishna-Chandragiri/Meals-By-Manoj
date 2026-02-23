import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeProvider } from './context/DarkModeContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import Analytics from './pages/Analytics/Analytics'

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const url = "https://meals-by-manoj-backend.onrender.com";

  // If not authenticated, only render the Login route
  if (!isAuthenticated) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    );
  }

  // If authenticated, render the full app with protected routes
  return (
    <>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Add url={url}/>} />
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Orders url={url}/>} />
            <Route path="/analytics" element={<Analytics url={url}/>} />
          </Route>
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  // Debug log to check environment variables in production
  useEffect(() => {
    console.log("Environment check:", {
      hasEnvVars: !!import.meta.env.VITE_ADMIN_EMAIL,
      mode: import.meta.env.MODE || 'unknown'
    });
  }, []);

  return (
    <AuthProvider>
      <DarkModeProvider>
        <div>
          <ToastContainer theme="colored" />
          <AppContent />
        </div>
      </DarkModeProvider>
    </AuthProvider>
  );
};

export default App
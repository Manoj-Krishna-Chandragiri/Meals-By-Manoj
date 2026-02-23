import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='navbar'>
        <div className="logo-container">
          <img className='logo' src={assets.logo} alt="Meals By Manoj" />
        </div>
        <div className="navbar-right">
          <DarkModeToggle />
          {isAuthenticated && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
          <img className='profile' src={assets.profile_image} alt="" />
        </div>
    </div>
  )
}

export default Navbar
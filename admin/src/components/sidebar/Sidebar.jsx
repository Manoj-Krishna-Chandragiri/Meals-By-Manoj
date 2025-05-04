import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  // Set analytics icon in document head when navigating to analytics page
  useEffect(() => {
    const linkIcon = document.querySelector('link[sizes="16x16"]');
    
    if (location.pathname === '/analytics') {
      if (linkIcon) {
        linkIcon.href = "/src/assets/logo.png";
      }
    } else {
      if (linkIcon) {
        linkIcon.href = "/src/assets/logo.png";
      }
    }
  }, [location]);
  
  return (
    <div className={`sidebar ${expanded ? 'sidebar-expanded' : ''}`}>
      <div className="toggle-sidebar" onClick={toggleSidebar}>
        {expanded ? '←' : '→'}
      </div>
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option" onClick={() => setExpanded(false)}>
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option food-list-icon" onClick={() => setExpanded(false)}>
          <img src={assets.food_list_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option" onClick={() => setExpanded(false)}>
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/analytics" className="sidebar-option analytics-icon" onClick={() => setExpanded(false)}>
          <img src={assets.analytics_icon} alt="Analytics" />
          <p>Analytics</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <div className="navbar-right">
          <DarkModeToggle />
          <img className='profile' src={assets.profile_image} alt="" />
        </div>
    </div>
  )
}

export default Navbar
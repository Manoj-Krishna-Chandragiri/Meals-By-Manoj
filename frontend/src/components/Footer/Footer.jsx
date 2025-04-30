import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    // Use a more reliable approach for assets by importing them directly
    // This ensures webpack/vite processes them correctly
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    {/* Use the imported assets directly - this works better with bundlers */}
                    <img src={assets.logo} alt="Meals By Manoj Logo" className="footer-logo" />
                    <p>Welcome to our food delivery service. We strive to bring you the best culinary experiences from local restaurants to your doorstep. Enjoy fast delivery, excellent customer service, and a wide variety of cuisine options.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="Facebook" />
                        <img src={assets.twitter_icon} alt="Twitter" />
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 852-382-3805</li>
                        <li>contact@manojkrishna.me</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 © MealsByManoj.com -  All Rights Reserved.</p>
        </div>
    )
}

export default Footer
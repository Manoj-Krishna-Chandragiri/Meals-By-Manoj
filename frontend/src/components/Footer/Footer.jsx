import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    // Create direct references to the deployed URLs to avoid path resolution issues
    const logoUrl = window.location.hostname === 'localhost' 
        ? assets.logo 
        : 'https://meals-by-manoj-frontend.onrender.com/assets/logo.png';

    const facebookIcon = window.location.hostname === 'localhost'
        ? assets.facebook_icon
        : 'https://meals-by-manoj-frontend.onrender.com/assets/facebook_icon.png';

    const twitterIcon = window.location.hostname === 'localhost'
        ? assets.twitter_icon
        : 'https://meals-by-manoj-frontend.onrender.com/assets/twitter_icon.png';

    const linkedinIcon = window.location.hostname === 'localhost'
        ? assets.linkedin_icon
        : 'https://meals-by-manoj-frontend.onrender.com/assets/linkedin_icon.png';

    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={logoUrl} alt="Meals By Manoj Logo" className="footer-logo" />
                    <p>Welcome to our food delivery service. We strive to bring you the best culinary experiences from local restaurants to your doorstep. Enjoy fast delivery, excellent customer service, and a wide variety of cuisine options.</p>
                    <div className="footer-social-icons">
                        <img src={facebookIcon} alt="Facebook" />
                        <img src={twitterIcon} alt="Twitter" />
                        <img src={linkedinIcon} alt="LinkedIn" />
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
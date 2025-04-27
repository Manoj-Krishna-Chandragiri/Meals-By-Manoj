import React from 'react';
import './TermsConditions.css';

const TermsConditions = ({ onClose }) => {
  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal">
        <div className="terms-modal-header">
          <h2>Terms and Conditions</h2>
          <button className="terms-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="terms-modal-content">
          <div className="project-note-container">
            <h3 className="project-note-title">📢 Important Note</h3>
            <p className="project-note">
              This is a <strong>portfolio project</strong> created by Manoj Krishna Chandragiri, not a real food delivery service. 
              No actual food orders will be fulfilled, and payment processing is in test mode only.
            </p>
          </div>
          
          <h3>How to Use This Website Effectively</h3>
          <div className="features-guidance">
            <h4>Key Features:</h4>
            <ul>
              <li><strong>Interactive Menu Exploration:</strong> Use the category tabs to filter food items and quickly find what you're looking for.</li>
              <li><strong>Smart Search:</strong> The search feature allows you to find food items by name or ingredients.</li>
              <li><strong>Dark Mode:</strong> Toggle between light and dark themes using the switch in the navigation bar.</li>
              <li><strong>Cart Management:</strong> Add items to your cart, adjust quantities, and view your order summary.</li>
              <li><strong>Order Tracking:</strong> After placing an order, you can track its status in the "Orders" section.</li>
            </ul>
            
            <h4>Tips for the Best Experience:</h4>
            <ul>
              <li>Create an account to access order history and save your delivery information.</li>
              <li>Use the search function when looking for specific dishes or ingredients.</li>
              <li>Check out the featured menu items for popular recommendations.</li>
              <li>View your cart before checkout to confirm your order and total.</li>
              <li>For demonstration purposes, all payment processes are simulated.</li>
            </ul>
          </div>
          
          <h3>Welcome to Meals By Manoj</h3>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h4>1. Acceptance of Terms</h4>
          <p>
            By accessing or using Meals By Manoj (the "Service"), you agree to be bound by these Terms and Conditions. 
            The Service is owned and operated by Manoj Krishna Chandragiri.
          </p>
          
          <h4>2. User Accounts</h4>
          <p>
            To use certain features of the Service, you must register for an account. You are responsible for maintaining 
            the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          
          <h4>3. Ordering and Delivery (Simulated)</h4>
          <p>
            3.1. All orders are simulated for demonstration purposes only.<br />
            3.2. No real food will be delivered.<br />
            3.3. Payment processing is in test mode and no actual charges will be made.
          </p>
          
          <h4>4. Privacy Policy</h4>
          <p>
            Your use of the Service is also governed by our Privacy Policy, which is incorporated by reference.
          </p>
          
          <h4>5. Limitation of Liability</h4>
          <p>
            To the maximum extent permitted by law, Manoj Krishna Chandragiri and Meals By Manoj shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
          </p>
          
          <h4>6. Project Purpose</h4>
          <p>
            This website was created as a portfolio project to demonstrate web development skills. It is not intended for 
            commercial use and does not represent a real business.
          </p>
          
          <h4>7. Technical Implementation</h4>
          <p>
            This project was built using React.js for the frontend, Node.js with Express for the backend, and MongoDB for the database.
            It features responsive design, state management, API integration, and user authentication.
          </p>
          
          <h4>8. Contact Information</h4>
          <p>
            For questions about this project, please contact:<br />
            Email: contact@manojkrishna.me<br />
            Phone: +91 852-382-3805
          </p>
          
          <div className="terms-footer">
            <p>© {new Date().getFullYear()} Meals By Manoj - Portfolio Project</p>
            <p>Created by Manoj Krishna Chandragiri</p>
          </div>
        </div>
        <div className="terms-modal-footer">
          <button className="terms-accept-btn" onClick={onClose}>I Understand and Accept</button>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

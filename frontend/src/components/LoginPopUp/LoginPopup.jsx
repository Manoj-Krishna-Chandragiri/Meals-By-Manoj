import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import TermsConditions from '../TermsConditions/TermsConditions';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions to continue");
      return;
    }
    
    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
    const endpointUrl = url + endpoint;

    try {
      const response = await axios.post(endpointUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input 
            type="checkbox" 
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            required 
          />
          <p>
            By continuing, I agree to the <span className="terms-link" onClick={() => setShowTerms(true)}>terms of use & privacy policy</span>.
          </p>
        </div>
        {currState === "Login" ?
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
      
      {showTerms && <TermsConditions onClose={() => {
        setShowTerms(false);
        setTermsAccepted(true);
      }} />}
    </div>
  );
};

LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired
};

export default LoginPopup;

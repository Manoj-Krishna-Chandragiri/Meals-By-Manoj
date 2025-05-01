import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const Navbar = ({ setShowLogin }) => { 
    const [menu, setMenu] = useState("home");
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchSuggestions([]);
            return;
        }

        const foodItems = document.querySelectorAll('.food-item');
        const suggestions = [];

        foodItems.forEach(item => {
            const nameElement = item.querySelector('.food-item-name-rating p');
            const descElement = item.querySelector('.food-item-descr');
            const itemId = item.id;
            
            if (!nameElement || !descElement || !itemId) return;
            
            const name = nameElement.textContent;
            const description = descElement.textContent;
            const query = searchQuery.toLowerCase();
            
            if (name.toLowerCase().includes(query) || 
                description.toLowerCase().includes(query)) {
                suggestions.push({
                    id: itemId,
                    name: name,
                    description: description.substring(0, 30) + "..."
                });
            }
        });

        setSearchSuggestions(suggestions.slice(0, 5));
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchActive && 
                searchContainerRef.current && 
                !searchContainerRef.current.contains(event.target)) {
                setSearchActive(false);
                setSearchSuggestions([]);
            }
        };
        
        if (searchActive) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchActive]);

    const handleSearchIconClick = () => {
        setSearchActive(!searchActive);
        if (!searchActive) {
            setTimeout(() => {
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                    
                    if (searchQuery.trim() !== "") {
                        setSearchQuery(searchQuery);
                    }
                }
            }, 100);
        }
    };

    const handleSuggestionClick = (itemId) => {
        const item = document.getElementById(itemId);
        if (item) {
            document.querySelectorAll('.food-item').forEach(i => {
                i.classList.remove('highlight');
            });
            
            item.classList.add('highlight');
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setSearchActive(false);
            setSearchSuggestions([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") return;

        const foodItems = document.querySelectorAll('.food-item');
        let found = false;

        foodItems.forEach(item => {
            item.classList.remove('highlight');
            
            const nameElement = item.querySelector('.food-item-name-rating p');
            const descElement = item.querySelector('.food-item-descr');
            
            if (!nameElement || !descElement) return;
            
            const name = nameElement.textContent.toLowerCase();
            const description = descElement.textContent.toLowerCase();
            const query = searchQuery.toLowerCase();
            
            if (name.includes(query) || description.includes(query)) {
                found = true;
                item.classList.add('highlight');
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        if (found) {
            setSearchActive(false);
        } else {
            alert("No food items match your search. Try a different term.");
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchSuggestions([]);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <DarkModeToggle />
                <div className="navbar-search">
                    <img 
                        src={assets.search_icon} 
                        alt="Search" 
                        onClick={handleSearchIconClick}
                        className={searchActive ? "active" : ""}
                    />
                    {searchActive && (
                        <div className="search-container" ref={searchContainerRef}>
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <input 
                                    ref={searchInputRef}
                                    type="text" 
                                    placeholder="Search food by name or description..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button 
                                        type="button" 
                                        className="clear-search" 
                                        onClick={clearSearch}
                                    >
                                        ×
                                    </button>
                                )}
                                <button type="submit" className="search-submit-btn">Search</button>
                            </form>
                            
                            {searchSuggestions.length > 0 && (
                                <div className="search-suggestions">
                                    {searchSuggestions.map(suggestion => (
                                        <div 
                                            key={suggestion.id} 
                                            className="search-suggestion-item"
                                            onClick={() => handleSuggestionClick(suggestion.id)}
                                        >
                                            <div className="suggestion-name">{suggestion.name}</div>
                                            <div className="suggestion-desc">{suggestion.description}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {!token ? 
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                :<div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
}
Navbar.propTypes = {
    setShowLogin: PropTypes.func.isRequired
};

export default Navbar;
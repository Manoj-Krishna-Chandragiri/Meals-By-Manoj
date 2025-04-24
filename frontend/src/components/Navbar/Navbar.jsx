import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => { 
    const [menu, setMenu] = useState("home");
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    
    const searchInputRef = useRef(null);
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
    const navigate = useNavigate();

    // Generate search suggestions based on query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchSuggestions([]);
            return;
        }

        // Find matching food items
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
            
            // Check if name or description matches the query
            if (name.toLowerCase().includes(query) || 
                description.toLowerCase().includes(query)) {
                suggestions.push({
                    id: itemId,
                    name: name,
                    description: description.substring(0, 30) + "..."
                });
            }
        });

        // Limit to top 5 suggestions
        setSearchSuggestions(suggestions.slice(0, 5));
    }, [searchQuery]);

    // Handle search icon click
    const handleSearchIconClick = () => {
        setSearchActive(!searchActive);
        if (!searchActive) {
            // Focus the input after rendering
            setTimeout(() => {
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                }
            }, 100);
        } else {
            setSearchQuery("");
        }
    };

    // Handle search suggestion click
    const handleSuggestionClick = (itemId) => {
        const item = document.getElementById(itemId);
        if (item) {
            // Remove previous highlights
            document.querySelectorAll('.food-item').forEach(i => {
                i.classList.remove('highlight');
            });
            
            // Highlight and scroll to the item
            item.classList.add('highlight');
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Close search
            setSearchActive(false);
            setSearchQuery("");
            setSearchSuggestions([]);
        }
    };

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") return;

        // Find and scroll to matching elements
        const foodItems = document.querySelectorAll('.food-item');
        let found = false;

        foodItems.forEach(item => {
            // Remove previous highlights
            item.classList.remove('highlight');
            
            // Get text content from name and description elements
            const nameElement = item.querySelector('.food-item-name-rating p');
            const descElement = item.querySelector('.food-item-descr');
            
            if (!nameElement || !descElement) return;
            
            const name = nameElement.textContent.toLowerCase();
            const description = descElement.textContent.toLowerCase();
            const query = searchQuery.toLowerCase();
            
            // Check if the item matches the search query
            if (name.includes(query) || description.includes(query)) {
                found = true;
                item.classList.add('highlight');
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        if (found) {
            setSearchActive(false);
        } else {
            // Show not found message
            alert("No food items match your search. Try a different term.");
        }
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
                <div className="navbar-search">
                    <img 
                        src={assets.search_icon} 
                        alt="Search" 
                        onClick={handleSearchIconClick}
                        className={searchActive ? "active" : ""}
                    />
                    {searchActive && (
                        <div className="search-container">
                            <form onSubmit={handleSearchSubmit}>
                                <input 
                                    ref={searchInputRef}
                                    type="text" 
                                    placeholder="Search food by name or description..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit">Search</button>
                            </form>
                            
                            {/* Search suggestions */}
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

export default Navbar;
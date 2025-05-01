import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './ExploreMenu.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const ExploreMenu = ({ category, setCategory }) => {
    const { url, food_list } = useContext(StoreContext);
    const [menuCategories, setMenuCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${url}/api/food/categories`);
                if (response.data.success) {
                    const formattedCategories = response.data.categories.map((cat) => {
                        const itemsInCategory = food_list.filter(item => item.category === cat);
                        let menuImage;
                        
                        if (itemsInCategory.length > 0) {
                            const firstItem = itemsInCategory[0];
                            if (firstItem.image) {
                                if (firstItem.image.startsWith('data:')) {
                                    menuImage = firstItem.image;
                                } else {
                                    menuImage = `${url}/images/${firstItem.image}`;
                                }
                            }
                        }
                        
                        if (!menuImage) {
                            switch (cat.toLowerCase()) {
                                case 'salad':
                                    menuImage = assets.menu_1;
                                    break;
                                case 'rolls':
                                    menuImage = assets.menu_2;
                                    break;
                                case 'deserts':
                                    menuImage = assets.menu_3;
                                    break;
                                case 'sandwich':
                                    menuImage = assets.menu_4;
                                    break;
                                case 'cake':
                                    menuImage = assets.menu_5;
                                    break;
                                case 'pure veg':
                                    menuImage = assets.menu_6;
                                    break;
                                case 'pasta':
                                    menuImage = assets.menu_7;
                                    break;
                                case 'noodles':
                                    menuImage = assets.menu_8;
                                    break;
                                case 'biryani':
                                    menuImage = assets.menu_9;
                                    break;
                                case 'pizza':
                                    menuImage = assets.pizzaFood1 || assets.food_37;
                                    break;
                                case 'burger':
                                    menuImage = assets.menu_burger;
                                    break;
                                case 'soup':
                                    menuImage = assets.menu_soup;
                                    break;
                                case 'drinks':
                                    menuImage = assets.menu_drinks;
                                    break;
                                case 'seafood':
                                    menuImage = assets.menu_seafood;
                                    break;
                                case 'dessert':
                                    menuImage = assets.dessertFood1 || assets.food_40;
                                    break;
                                default:
                                    menuImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23${Math.floor(Math.random()*16777215).toString(16)}'/%3E%3Ctext x='50' y='55' font-size='14' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3E${cat.substring(0, 6)}%3C/text%3E%3C/svg%3E`;
                            }
                        }

                        return {
                            menu_name: cat,
                            menu_image: menuImage
                        };
                    });

                    const allCategoryIcon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ff6347'/%3E%3Ctext x='50' y='55' font-size='20' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3EAll%3C/text%3E%3C/svg%3E`;

                    setMenuCategories([
                        { menu_name: "All", menu_image: allCategoryIcon },
                        ...formattedCategories
                    ]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [url, food_list]);

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our Menu</h1>
            <p className='explore-menu-text'>
                Discover our wide range of delicious options. From quick bites to gourmet meals, we have something for everyone.
            </p>
            <div className="explore-menu-list">
                {loading ? (
                    <p>Loading categories...</p>
                ) : (
                    menuCategories.map((item, index) => (
                        <div 
                            key={index} 
                            className="explore-menu-list-items" 
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        >
                            <img 
                                src={item.menu_image} 
                                alt={item.menu_name} 
                                className={`menu-image ${category === item.menu_name ? 'active' : ''}`} 
                            />
                            <p>{item.menu_name}</p>
                        </div>
                    ))
                )}
            </div>
            <hr />
        </div>
    );
};

ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired
};

export default ExploreMenu;
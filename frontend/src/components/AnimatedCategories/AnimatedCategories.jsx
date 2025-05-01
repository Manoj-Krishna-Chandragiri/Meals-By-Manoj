import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './AnimatedCategories.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const AnimatedCategories = ({ onSelectCategory, selectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const { url } = useContext(StoreContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${url}/api/food/categories`);
                if (response.data.success) {
                    const formattedCategories = response.data.categories.map((cat) => {
                        let menuImage;
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
                                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                                menuImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23${randomColor}'/%3E%3Ctext x='50' y='55' font-size='14' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3E${cat.substring(0, 6)}%3C/text%3E%3C/svg%3E`;
                        }

                        return {
                            menu_name: cat,
                            menu_image: menuImage
                        };
                    });

                    setCategories([
                        { menu_name: "All", menu_image: assets.menu_all },
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
    }, [url]);

    return (
        <div className="animated-categories">
            {loading ? (
                <div className="loading-categories">Loading categories...</div>
            ) : (
                <div className="categories-container">
                    {categories.map((item, index) => (
                        <div 
                            key={index} 
                            className={`category-item ${selectedCategory === item.menu_name ? 'active' : ''}`}
                            onClick={() => onSelectCategory(item.menu_name)}
                        >
                            <div className="category-image">
                                <img src={item.menu_image} alt={item.menu_name} />
                            </div>
                            <p>{item.menu_name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

AnimatedCategories.propTypes = {
    onSelectCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired
};

export default AnimatedCategories;

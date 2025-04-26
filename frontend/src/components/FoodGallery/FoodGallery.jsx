import React, { useState, useContext, useRef, useEffect } from 'react';
import './FoodGallery.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const FoodGallery = ({ foods }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart, url } = useContext(StoreContext);
  const galleryRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }
    
    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);
  
  if (!foods || foods.length === 0) {
    return null;
  }

  // Handle potentially missing images and SVG data URIs
  const getImageUrl = (image) => {
    // If image is a data URI, use it directly
    if (image && (image.startsWith('data:image') || image.startsWith('data:image/svg+xml'))) {
      return image;
    }
    // Otherwise, use the backend URL
    return `${url}/images/${image}`;
  };

  return (
    <div className={`food-gallery ${isVisible ? 'visible' : ''}`} ref={galleryRef}>
      <h2 className="food-gallery-title">Featured Menu</h2>
      
      <div className="food-gallery-container">
        <div className="food-gallery-showcase">
          <div 
            className="featured-food" 
            style={{ backgroundImage: `url(${getImageUrl(foods[activeIndex].image)})` }}
          >
            <div className="food-info">
              <h3>{foods[activeIndex].name}</h3>
              <p>{foods[activeIndex].description}</p>
              <div className="food-price-rating">
                <span className="price">${foods[activeIndex].price.toFixed(2)}</span>
                <img src={assets.rating_starts} alt="rating" className="rating" />
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(foods[activeIndex]._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="food-gallery-thumbnails">
          {foods.map((food, index) => (
            <div 
              key={food._id} 
              className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <img 
                src={getImageUrl(food.image)} 
                alt={food.name} 
              />
              <span className="thumbnail-name">{food.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodGallery;

import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const itemRef = useRef(null);
    
    const handleAddToCart = () => {
        addToCart(id);
        
        if (itemRef.current) {
            itemRef.current.classList.add('add-to-cart-animation');
            
            setTimeout(() => {
                if (itemRef.current) {
                    itemRef.current.classList.remove('add-to-cart-animation');
                }
            }, 500);
        }
    };

    const getImageUrl = (image) => {
        if (image && (image.startsWith('data:image') || image.startsWith('data:image/svg+xml'))) {
            return image;
        }
        return `${url}/images/${image}`;
    };

    return (
        <div className='food-item' id={id} ref={itemRef}>
            <div className="food-item-img-container">
                <img className='food-item-image' src={getImageUrl(image)} alt={name} />
                {!cartItems[id]
                    ? <img 
                        className='add' 
                        onClick={handleAddToCart} 
                        src={assets.add_icon_white} 
                        alt="Add to cart" 
                      />
                    : <div className='food-item-counter'>
                        <img 
                            onClick={() => removeFromCart(id)} 
                            src={assets.remove_icon_red} 
                            alt="Remove" 
                        />
                        <p>{cartItems[id]}</p>
                        <img 
                            onClick={handleAddToCart} 
                            src={assets.add_icon_green} 
                            alt="Add more" 
                        />
                      </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-descr">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default FoodItem

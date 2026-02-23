import React, { useState, useContext, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import FoodGallery from '../../components/FoodGallery/FoodGallery';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const { food_list } = useContext(StoreContext);
  
  useEffect(() => {
    if (food_list && food_list.length > 0) {
      const allCategories = [...new Set(food_list.map(item => item.category))];
      
      const shuffledCategories = [...allCategories].sort(() => 0.5 - Math.random());
      
      const categoriesToUse = shuffledCategories.slice(0, 6);
      
      const selectedFeaturedFoods = [];
      
      categoriesToUse.forEach(categoryName => {
        const itemsInCategory = food_list.filter(item => item.category === categoryName);
        
        if (itemsInCategory.length > 0) {
          const randomIndex = Math.floor(Math.random() * itemsInCategory.length);
          
          selectedFeaturedFoods.push(itemsInCategory[randomIndex]);
        }
      });
      
      const chickenSalad = food_list.find(item => item._id === "4");
      
      const chickenSaladAlreadyIncluded = selectedFeaturedFoods.some(item => item._id === "4");
      
      if (chickenSalad && !chickenSaladAlreadyIncluded) {
        if (selectedFeaturedFoods.length >= 6) {
          selectedFeaturedFoods.pop();
        }
        
        selectedFeaturedFoods.unshift(chickenSalad);
      }
      
      if (selectedFeaturedFoods.length < 6) {
        const selectedIds = new Set(selectedFeaturedFoods.map(item => item._id));
        
        const remainingItems = food_list.filter(item => !selectedIds.has(item._id));
        
        const shuffledRemainingItems = [...remainingItems].sort(() => 0.5 - Math.random());
        
        const additionalItems = shuffledRemainingItems.slice(0, 6 - selectedFeaturedFoods.length);
        selectedFeaturedFoods.push(...additionalItems);
      }
      
      setFeaturedFoods(selectedFeaturedFoods);
    }
  }, [food_list]);

  return (
    <div className="home">
      <Header />
      
      <ExploreMenu 
        category={category} 
        setCategory={setCategory} 
      />
      
      {featuredFoods.length > 0 && (
        <FoodGallery foods={featuredFoods} />
      )}
      
      <section id="menu-section" className="menu-section">
        <FoodDisplay category={category} />
      </section>
      
      <AppDownload />
    </div>
  );
}

export default Home;
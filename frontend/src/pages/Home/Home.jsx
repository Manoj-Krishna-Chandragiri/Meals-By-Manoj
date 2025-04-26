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
    // Select one random item from each category for the featured menu
    if (food_list && food_list.length > 0) {
      // Get all unique categories from the food list
      const allCategories = [...new Set(food_list.map(item => item.category))];
      
      // Randomly shuffle the categories to get a random selection
      const shuffledCategories = [...allCategories].sort(() => 0.5 - Math.random());
      
      // Calculate how many categories we need to select from to get 6 items
      // If we have fewer than 6 categories, we'll use all available categories
      // If we have more than 6 categories, we'll select 6 random categories
      const categoriesToUse = shuffledCategories.slice(0, 6);
      
      // Initialize featured foods array
      const selectedFeaturedFoods = [];
      
      // For each category, select one random item
      categoriesToUse.forEach(categoryName => {
        // Get all items in this category
        const itemsInCategory = food_list.filter(item => item.category === categoryName);
        
        // If the category has items, randomly select one
        if (itemsInCategory.length > 0) {
          // Get random index
          const randomIndex = Math.floor(Math.random() * itemsInCategory.length);
          
          // Add the random item to our featured foods
          selectedFeaturedFoods.push(itemsInCategory[randomIndex]);
        }
      });
      
      // Make sure we always include Chicken Salad if available
      const chickenSalad = food_list.find(item => item._id === "4");
      
      // Check if Chicken Salad is already included
      const chickenSaladAlreadyIncluded = selectedFeaturedFoods.some(item => item._id === "4");
      
      if (chickenSalad && !chickenSaladAlreadyIncluded) {
        // If we have 6 items already, remove one to make room for Chicken Salad
        if (selectedFeaturedFoods.length >= 6) {
          selectedFeaturedFoods.pop();
        }
        
        // Add Chicken Salad to the featured items
        selectedFeaturedFoods.unshift(chickenSalad);
      }
      
      // If we still have fewer than 6 items, add more random items
      if (selectedFeaturedFoods.length < 6) {
        // Get IDs of already selected items
        const selectedIds = new Set(selectedFeaturedFoods.map(item => item._id));
        
        // Get items not already selected
        const remainingItems = food_list.filter(item => !selectedIds.has(item._id));
        
        // Shuffle remaining items
        const shuffledRemainingItems = [...remainingItems].sort(() => 0.5 - Math.random());
        
        // Add enough to reach 6 items total
        const additionalItems = shuffledRemainingItems.slice(0, 6 - selectedFeaturedFoods.length);
        selectedFeaturedFoods.push(...additionalItems);
      }
      
      // Set the featured foods
      setFeaturedFoods(selectedFeaturedFoods);
    }
  }, [food_list]);

  return (
    <div className="home">
      <Header />
      
      {/* Replace AnimatedCategories with ExploreMenu */}
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
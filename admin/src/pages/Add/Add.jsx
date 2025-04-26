import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const Add = ({url}) => {
  const [image,setImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  });

  // Fetch existing categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, [url]);
  
  // Extract the fetchCategories function to be able to call it after adding new categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/food/categories`);
      if (response.data.success) {
        setCategories(response.data.categories);
        
        // If categories exist and we don't have a category selected, set the first one
        if (response.data.categories.length > 0 && !data.category) {
          setData(prev => ({...prev, category: response.data.categories[0]}));
        }
        
        // Set a default category to delete if we don't have one yet
        if (response.data.categories.length > 0 && !categoryToDelete) {
          setCategoryToDelete(response.data.categories[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }
    
    try {
      const response = await axios.post(`${url}/api/food/addCategory`, { name: newCategory });
      
      if (response.data.success) {
        // Use functional update to ensure we have the latest state
        setCategories(prevCategories => {
          // Check if the category already exists to avoid duplicates
          if (!prevCategories.includes(newCategory)) {
            return [...prevCategories, newCategory];
          }
          return prevCategories;
        });
        
        // Set the newly added category as the selected one
        setData(prev => ({ ...prev, category: newCategory }));
        
        // Reset the new category input and hide it
        setNewCategory("");
        setShowNewCategoryInput(false);
        
        toast.success("New category added");
        
        // Refresh categories from server to ensure consistency
        fetchCategories();
      } else {
        toast.error(response.data.message || "Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  const handleRemoveCategory = async () => {
    if (!categoryToDelete) {
      toast.error("Please select a category to delete");
      return;
    }

    try {
      toast.info(`Attempting to remove category: ${categoryToDelete}`);
      console.log("Sending request to:", `${url}/api/food/removeCategory`);
      
      // Debug the URL and payload
      console.log("Server URL:", url);
      console.log("Full endpoint:", `${url}/api/food/removeCategory`);
      console.log("Request payload:", { name: categoryToDelete });
      
      // Use fetch instead of axios as a troubleshooting step
      const response = await fetch(`${url}/api/food/removeCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryToDelete }),
      });
      
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.success) {
        toast.success(data.message || "Category removed successfully");
        
        // Refresh categories list
        fetchCategories();
        
        // If the deleted category was the currently selected one, reset it
        if (data.category === categoryToDelete) {
          if (data.categories && data.categories.length > 0) {
            setData(prev => ({ ...prev, category: data.categories[0] }));
          } else {
            setData(prev => ({ ...prev, category: "Salad" }));
          }
        }
      } else {
        toast.error(data.message || "Failed to remove category");
      }
    } catch (error) {
      console.error("Error removing category:", error);
      toast.error(`Failed to remove category: ${error.message || "Unknown error"}`);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image);
    
    try {
      const response = await axios.post(`${url}/api/food/add`,formData);
      if (response.data.success) {
        setData({
          name:"",
          description:"",
          price:"",
          category: categories.length > 0 ? categories[0] : "Salad"
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to add food item");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error("Failed to add food item");
    }
  };

  return (
    <div className='add'>
      <div className="add-tabs">
        <button 
          className={!showCategoryManager ? "active" : ""}
          onClick={() => setShowCategoryManager(false)}
        >
          Add Food Item
        </button>
        <button 
          className={showCategoryManager ? "active" : ""}
          onClick={() => setShowCategoryManager(true)}
        >
          Manage Categories
        </button>
      </div>
      
      {!showCategoryManager ? (
        // Food Item Form
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content here' required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <div className="category-selection">
                {!showNewCategoryInput ? (
                  <>
                    <select onChange={onChangeHandler} name="category" value={data.category}>
                      {categories.length > 0 ? 
                        categories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))
                        : 
                        <>
                          <option value="Salad">Salad</option>
                          <option value="Rolls">Rolls</option>
                          <option value="Deserts">Deserts</option>
                          <option value="Sandwich">Sandwich</option>
                          <option value="Cake">Cake</option>
                          <option value="Pure Veg">Pure Veg</option>
                          <option value="Pasta">Pasta</option>
                          <option value="Noodles">Noodles</option>
                          <option value="Biryani">Biryani</option>
                        </>
                      }
                    </select>
                    <button 
                      type="button" 
                      className="new-category-btn" 
                      onClick={() => setShowNewCategoryInput(true)}
                    >
                      + New
                    </button>
                  </>
                ) : (
                  <div className="new-category-input">
                    <input 
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category name"
                    />
                    <div className="new-category-actions">
                      <button 
                        type="button" 
                        className="add-category-btn"
                        onClick={handleAddCategory}
                      >
                        Add
                      </button>
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => {
                          setShowNewCategoryInput(false);
                          setNewCategory("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' required />
            </div>
          </div>
          <button type='submit' className='add-btn'>ADD</button>
        </form>
      ) : (
        // Category Management
        <div className="category-manager">
          <h3>Manage Categories</h3>
          <div className="category-add-section">
            <h4>Add New Category</h4>
            <div className="category-add-input">
              <input 
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
              />
              <button 
                onClick={handleAddCategory}
                className="add-category-btn"
              >
                Add Category
              </button>
            </div>
          </div>
          
          <div className="category-remove-section">
            <h4>Remove Category</h4>
            <div className="remove-category-warning">
              <p><i>Warning: You can only remove categories that have no associated food items.</i></p>
              <p><i>Default categories cannot be removed.</i></p>
            </div>
            <div className="category-remove-input">
              <select 
                value={categoryToDelete}
                onChange={(e) => setCategoryToDelete(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <button 
                onClick={handleRemoveCategory}
                className="remove-category-btn"
              >
                Remove Category
              </button>
            </div>
          </div>
          
          <div className="categories-list">
            <h4>Current Categories</h4>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Add.propTypes = {
  url: PropTypes.string.isRequired
}

export default Add
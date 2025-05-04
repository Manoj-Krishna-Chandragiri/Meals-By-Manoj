import React from 'react'
import './List.css'
import { useState, useCallback, useMemo } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const List = ({url}) => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const [categories, setCategories] = useState(['All']);
  const [visibleItems, setVisibleItems] = useState(20); // Initially show 20 items

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/categories`);
      if (response.data.success) {
        setCategories(['All', ...response.data.categories]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [url]);

  const allCategories = useMemo(() => {
    const cats = ['All', ...new Set(list.map(item => item.category))];
    return cats;
  }, [list]);

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food items");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Network error while fetching food items");
    }
  }, [url]);

  const removeFood = async(foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Error removing item");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Network error while removing food item");
    }
  }

  const openEditModal = async (item) => {
    await fetchCategories();

    setEditingItem(item);
    setEditFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      id: editingItem._id,
      name: editFormData.name,
      description: editFormData.description,
      price: Number(editFormData.price),
      category: editFormData.category
    };
    
    const loadingToast = toast.loading("Updating food item...");
    
    try {
      console.log("Sending update request with payload:", payload);
      
      const response = await fetch(`${url}/api/food/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      toast.dismiss(loadingToast);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          toast.success("Food item updated successfully");
          closeEditModal();
          await fetchList(); 
          await fetchCategories();
        } else {
          toast.error(data.message || "Update failed");
        }
      } else {
        toast.error(`Server error: ${response.status} ${response.statusText}`);
        console.error("Server response:", response.status, response.statusText);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error updating food:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchList();
    fetchCategories();
  }, [fetchList, fetchCategories]);
  
  const filteredAndSortedList = useMemo(() => {
    const filtered = list.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    return filtered.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [list, searchQuery, selectedCategory, sortBy, sortOrder]);
  
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  const getSortIndicator = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  // Add this function to load more items
  const loadMoreItems = () => {
    setVisibleItems(prev => prev + 10); // Load 10 more items
  };

  // Get paginated list items
  const paginatedItems = useMemo(() => {
    return filteredAndSortedList.slice(0, visibleItems);
  }, [filteredAndSortedList, visibleItems]);

  return (
    <div className='list add flex-col'>
      <h2>All Foods List</h2>
      
      <div className="list-controls">
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search by name or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button onClick={fetchList} className="refresh-btn">Refresh List</button>
      </div>
      
      <div className="list-summary">
        <p>Showing {paginatedItems.length} of {filteredAndSortedList.length} items (total: {list.length})</p>
      </div>
      
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b className="sortable" onClick={() => handleSort('name')}>
            Name{getSortIndicator('name')}
          </b>
          <b className="sortable" onClick={() => handleSort('category')}>
            Category{getSortIndicator('category')}
          </b>
          <b className="sortable" onClick={() => handleSort('price')}>
            Price{getSortIndicator('price')}
          </b>
          <b>Actions</b>
        </div>
        {filteredAndSortedList.length > 0 ? (
          paginatedItems.map((item, index) => (
            <div key={item._id || index} className='list-table-format'>
              <img src={item.image && item.image.startsWith('data:') ? item.image : `${url}/images/${item.image}`} alt={item.name} />
              <div className="item-name-description">
                <p className="item-name">{item.name}</p>
                <p className="item-description">{item.description.substring(0, 50)}...</p>
              </div>
              <p className="item-category">{item.category}</p>
              <p className="item-price">${item.price}</p>
              <div className="item-actions">
                <button 
                  onClick={() => openEditModal(item)}
                  className="edit-btn"
                  title="Edit this item"
                >
                  Edit
                </button>
                <button 
                  onClick={() => removeFood(item._id)}
                  className="delete-btn"
                  title="Delete this item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-items-found">
            <p>No food items found. {searchQuery ? 'Try adjusting your search.' : ''}</p>
          </div>
        )}
      </div>

      {visibleItems < filteredAndSortedList.length && (
        <div className="load-more-container">
          <button onClick={loadMoreItems} className="load-more-btn">
            Load More Items
          </button>
          <p className="items-remaining">
            {filteredAndSortedList.length - visibleItems} items remaining
          </p>
        </div>
      )}

      {isEditModalOpen && editingItem && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h3>Edit Food Item</h3>
              <button className="close-modal" onClick={closeEditModal}>×</button>
            </div>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditInputChange}
                  required
                >
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price ($):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0.01"
                  step="0.01"
                  value={editFormData.price}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="edit-modal-actions">
                <button type="button" onClick={closeEditModal} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  url: PropTypes.string.isRequired
}

export default List
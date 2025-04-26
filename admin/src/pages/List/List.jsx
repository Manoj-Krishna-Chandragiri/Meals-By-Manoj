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
  
  // Get unique categories from food items
  const categories = useMemo(() => {
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

  useEffect(() => {
    fetchList();
  }, [fetchList]);
  
  // Filter and sort food items
  const filteredAndSortedList = useMemo(() => {
    // First filter by search query and category
    const filtered = list.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    // Then sort by selected column and order
    return filtered.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      // For string values
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
  
  // Toggle sort order and column
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  // Get sort indicator
  const getSortIndicator = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

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
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button onClick={fetchList} className="refresh-btn">Refresh List</button>
      </div>
      
      <div className="list-summary">
        <p>Showing {filteredAndSortedList.length} of {list.length} items</p>
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
          <b>Action</b>
        </div>
        {filteredAndSortedList.length > 0 ? (
          filteredAndSortedList.map((item, index) => (
            <div key={item._id || index} className='list-table-format'>
              <img src={item.image && item.image.startsWith('data:') ? item.image : `${url}/images/${item.image}`} alt={item.name} />
              <div className="item-name-description">
                <p className="item-name">{item.name}</p>
                <p className="item-description">{item.description.substring(0, 50)}...</p>
              </div>
              <p className="item-category">{item.category}</p>
              <p className="item-price">${item.price}</p>
              <button 
                onClick={() => removeFood(item._id)}
                className="delete-btn"
                title="Delete this item"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="no-items-found">
            <p>No food items found. {searchQuery ? 'Try adjusting your search.' : ''}</p>
          </div>
        )}
      </div>
    </div>
  )
}

List.propTypes = {
  url: PropTypes.string.isRequired
}

export default List
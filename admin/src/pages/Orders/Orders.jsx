import React from 'react'
import './Orders.css'
import { useState, useCallback, useMemo } from 'react'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import axios from "axios"
import {assets} from "../../assets/assets"
import PropTypes from 'prop-types'

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc'); // desc = newest first, asc = oldest first
  const [visibleOrders, setVisibleOrders] = useState(20); // Initially show 20 orders
  
  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(url+"/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const statusHandler = async (event, orderId) => {
    try {
      setLoading(true); // Show loading state
      
      const response = await axios.post(url+"/api/order/status", {
        orderId,
        status: event.target.value
      });
      
      if (response.data.success) {
        // Fetch all orders to ensure we have the latest data
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false); // Hide loading state
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // Function to handle sorting
  const handleSortChange = (event) => {
    const [newSortBy, newSortOrder] = event.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Function to load more orders
  const loadMoreOrders = () => {
    setVisibleOrders(prev => prev + 10); // Load 10 more orders
  };

  // Sort and filter orders
  const sortedOrders = useMemo(() => {
    if (!orders.length) return [];
    
    return [...orders].sort((a, b) => {
      if (sortBy === 'date') {
        // Fix the date sorting by using the correct field name (date instead of createdAt)
        // and properly converting to Date objects
        const dateA = new Date(a.date || a.createdAt || 0); // Try date first, fall back to createdAt
        const dateB = new Date(b.date || b.createdAt || 0);
        
        // Make sure we're using valid dates for comparison
        const validDateA = !isNaN(dateA.getTime()) ? dateA : new Date(0);
        const validDateB = !isNaN(dateB.getTime()) ? dateB : new Date(0);
        
        // Compare dates (newest first or oldest first)
        return sortOrder === 'asc' ? validDateA - validDateB : validDateB - validDateA;
      } else if (sortBy === 'price') {
        const priceA = parseFloat(a.amount) || 0;
        const priceB = parseFloat(b.amount) || 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      } else if (sortBy === 'items') {
        const itemsA = a.items ? a.items.length : 0;
        const itemsB = b.items ? b.items.length : 0;
        return sortOrder === 'asc' ? itemsA - itemsB : itemsB - itemsA;
      }
      return 0;
    });
  }, [orders, sortBy, sortOrder]);

  // Get paginated orders
  const paginatedOrders = useMemo(() => {
    return sortedOrders.slice(0, visibleOrders);
  }, [sortedOrders, visibleOrders]);

  return (
    <div className='order add'>
      <div className="orders-header">
        <h3>Order Page</h3>
        
        <div className="orders-controls">
          <div className="sort-control">
            <label htmlFor="sortOrder">Sort by:</label>
            <select 
              id="sortOrder" 
              value={`${sortBy}-${sortOrder}`} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="items-desc">Items (Most First)</option>
              <option value="items-asc">Items (Least First)</option>
            </select>
          </div>
          
          <button onClick={fetchAllOrders} className="refresh-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Refresh Orders
          </button>
        </div>
      </div>
      
      <div className="orders-info">
        <p>Showing {paginatedOrders.length} of {orders.length} orders</p>
      </div>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : (
        <>
          <div className="order-list">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, index) => (
                <div key={index} className='order-item'>
                  <img src={assets.parcel_icon} alt="" />
                  <div>
                    <p className='order-item-food'>
                      {order.items.map((item, index) => {
                        if (index === order.items.length-1) {
                          return item.name + " x " + +item.quantity
                        } else {
                          return item.name + " x " + item.quantity + ", "
                        }
                      })}
                    </p>
                    <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                    <div className="order-item-address">
                      <p>{order.address.street + ","}</p>
                      <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                    </div>
                    <p className="order-item-phone">{order.address.phone}</p>
                    <p className="order-date">Ordered on: {new Date(order.date || order.createdAt).toLocaleString()}</p>
                  </div>
                  <p>Items: {order.items.length}</p>
                  <p>${order.amount}</p>
                  <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              ))
            ) : (
              <div className="no-orders">
                <p>No orders found</p>
              </div>
            )}
          </div>
          
          {visibleOrders < orders.length && (
            <div className="load-more-container">
              <button onClick={loadMoreOrders} className="load-more-btn">
                Load More Orders
              </button>
              <p className="orders-remaining">
                {orders.length - visibleOrders} orders remaining
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

Orders.propTypes = {
  url: PropTypes.string.isRequired
}

export default Orders
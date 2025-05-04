import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Analytics.css';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDarkMode } from '../../context/DarkModeContext';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = ({ url }) => {
  const [orderData, setOrderData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    document.title = "Analytics Dashboard | Meals By Manoj";
    
    // Update favicon for analytics page
    const linkIcon = document.querySelector('link[sizes="16x16"]');
    if (linkIcon) {
      linkIcon.href = "/src/assets/logo.png";
    }
    
    // Clean up function to restore original favicon when leaving page
    return () => {
      if (linkIcon) {
        linkIcon.href = "/src/assets/logo.png";
      }
    };
  }, []);

  // Fetch data only once when component mounts or when refresh is triggered
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Add timestamp to avoid caching
        const timestamp = new Date().getTime();
        const ordersResponse = await axios.get(`${url}/api/order/list?t=${timestamp}`);
        const foodResponse = await axios.get(`${url}/api/food/list?t=${timestamp}`);
        const categoriesResponse = await axios.get(`${url}/api/food/categories?t=${timestamp}`);
        
        if (ordersResponse.data.success) {
          // Make sure all dates are parsed correctly - look for both date and createdAt fields
          const ordersWithFormattedDates = (ordersResponse.data.data || []).map(order => ({
            ...order,
            // Use date field if available, otherwise use createdAt or current date
            createdAt: order.date ? new Date(order.date).toISOString() : 
                      order.createdAt ? new Date(order.createdAt).toISOString() : 
                      new Date().toISOString()
          }));
          setOrderData(ordersWithFormattedDates);
        } else {
          throw new Error("Failed to fetch order data");
        }
        
        if (foodResponse.data.success) {
          setFoodData(foodResponse.data.data || []);
        } else {
          throw new Error("Failed to fetch food data");
        }
        
        if (categoriesResponse.data.success) {
          setCategoryData(categoriesResponse.data.categories || []);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError(error.message || "Failed to load analytics data");
        toast.error("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch data
    fetchData();
  }, [url, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
    toast.info("Refreshing data...");
  };

  const filteredOrders = useMemo(() => {
    if (!orderData.length) return [];
    
    const now = new Date();
    let filterDate = new Date();
    
    switch(timeRange) {
      case 'day':
        // Set to 24 hours ago
        filterDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        // Set to 7 days ago
        filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        // Set to 30 days ago
        filterDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        // Set to 365 days ago
        filterDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    return orderData.filter(order => {
      // Get the date from either date or createdAt field
      const orderDateStr = order.date || order.createdAt;
      if (!orderDateStr) return false;
      
      const orderDate = new Date(orderDateStr);
      return orderDate >= filterDate && orderDate <= now;
    });
  }, [orderData, timeRange]);

  // Add debug logging to help troubleshoot
  useEffect(() => {
    if (orderData.length > 0) {
      console.log(`Total orders in database: ${orderData.length}`);
      console.log(`Filtered orders for ${timeRange}: ${filteredOrders.length}`);
      
      if (filteredOrders.length > 0) {
        const firstOrderDate = new Date(filteredOrders[0].createdAt);
        console.log(`First filtered order date: ${firstOrderDate.toLocaleString()}`);
      }
    }
  }, [filteredOrders, orderData, timeRange]);

  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0);
  }, [filteredOrders]);

  const popularItems = useMemo(() => {
    if (!filteredOrders.length) return [];
    
    const itemCounts = {};
    
    filteredOrders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (!itemCounts[item.name]) {
            itemCounts[item.name] = 0;
          }
          itemCounts[item.name] += (parseInt(item.quantity) || 1);
        });
      }
    });
    
    return Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, [filteredOrders]);

  const orderStatusCounts = useMemo(() => {
    if (!filteredOrders.length) return { 'Food Processing': 0, 'Out for delivery': 0, 'Delivered': 0 };
    
    const statuses = ['Food Processing', 'Out for delivery', 'Delivered'];
    const counts = {};
    
    // Initialize counts for all statuses to ensure we have all categories even if count is 0
    statuses.forEach(status => {
      counts[status] = 0;
    });
    
    // Count orders by status
    filteredOrders.forEach(order => {
      const status = order.status || 'Food Processing'; // Default to Food Processing if no status
      if (statuses.includes(status)) {
        counts[status] += 1;
      } else {
        // For any unknown status, count as Food Processing
        counts['Food Processing'] += 1;
      }
    });
    
    return counts;
  }, [filteredOrders]);

  // Calculate total orders across all statuses for percentage calculation
  const totalOrdersAllStatuses = useMemo(() => {
    return Object.values(orderStatusCounts).reduce((sum, count) => sum + count, 0);
  }, [orderStatusCounts]);

  // Debug logging to help track order status distribution
  useEffect(() => {
    if (orderStatusCounts) {
      console.log("Order status distribution:", orderStatusCounts);
      console.log("Total orders with status:", totalOrdersAllStatuses);
    }
  }, [orderStatusCounts, totalOrdersAllStatuses]);

  // Calculate category-wise order distribution
  const categoryOrdersData = useMemo(() => {
    if (!filteredOrders.length || !foodData.length) return null;
    
    // Create a map of food names to categories
    const foodCategoryMap = {};
    foodData.forEach(food => {
      foodCategoryMap[food.name] = food.category;
    });
    
    // Count orders by category
    const categoryCounts = {};
    
    filteredOrders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const category = foodCategoryMap[item.name] || 'Other';
          if (!categoryCounts[category]) {
            categoryCounts[category] = 0;
          }
          categoryCounts[category] += (parseInt(item.quantity) || 1);
        });
      }
    });
    
    // Convert to chart.js format
    const categories = Object.keys(categoryCounts);
    
    // Generate random but consistent colors for categories
    const getColorForCategory = (category, index) => {
      const baseColors = [
        'rgba(255, 99, 132, 0.8)',   // Red
        'rgba(54, 162, 235, 0.8)',   // Blue
        'rgba(255, 206, 86, 0.8)',   // Yellow
        'rgba(75, 192, 192, 0.8)',   // Teal
        'rgba(153, 102, 255, 0.8)',  // Purple
        'rgba(255, 159, 64, 0.8)',   // Orange
        'rgba(199, 199, 199, 0.8)',  // Gray
        'rgba(83, 102, 255, 0.8)',   // Indigo
        'rgba(78, 235, 133, 0.8)',   // Green
        'rgba(255, 99, 255, 0.8)',   // Pink
      ];
      
      return baseColors[index % baseColors.length];
    };
    
    const backgroundColor = categories.map((category, index) => 
      getColorForCategory(category, index)
    );
    
    const borderColor = backgroundColor.map(color => 
      color.replace('0.8', '1')
    );
    
    return {
      labels: categories,
      datasets: [
        {
          label: 'Orders by Category',
          data: categories.map(category => categoryCounts[category]),
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  }, [filteredOrders, foodData]);

  if (loading) {
    return (
      <div className="analytics analytics-loading">
        <div className="analytics-loader">
          <div className="spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics analytics-error">
        <h2>Could not load analytics</h2>
        <p>{error}</p>
        <button onClick={handleRefresh} className="refresh-btn">Try Again</button>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>Business Analytics</h2>
        <button onClick={handleRefresh} className="refresh-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
          Refresh Data
        </button>
      </div>
      
      <div className="time-filter">
        <button 
          className={timeRange === 'day' ? 'active' : ''} 
          onClick={() => setTimeRange('day')}
        >
          Last 24 Hours
        </button>
        <button 
          className={timeRange === 'week' ? 'active' : ''} 
          onClick={() => setTimeRange('week')}
        >
          Last Week
        </button>
        <button 
          className={timeRange === 'month' ? 'active' : ''} 
          onClick={() => setTimeRange('month')}
        >
          Last Month
        </button>
        <button 
          className={timeRange === 'year' ? 'active' : ''} 
          onClick={() => setTimeRange('year')}
        >
          Last Year
        </button>
      </div>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Orders</h3>
          <div className="analytics-value">{filteredOrders.length}</div>
          <div className="analytics-trend">
            {timeRange === 'day' ? 'Today' : timeRange === 'week' ? 'This week' : timeRange === 'month' ? 'This month' : 'This year'}
          </div>
        </div>
        
        <div className="analytics-card">
          <h3>Total Revenue</h3>
          <div className="analytics-value">${totalRevenue.toFixed(2)}</div>
          <div className="analytics-trend">
            {timeRange === 'day' ? 'Today' : timeRange === 'week' ? 'This week' : timeRange === 'month' ? 'This month' : 'This year'}
          </div>
        </div>
        
        <div className="analytics-card">
          <h3>Avg. Order Value</h3>
          <div className="analytics-value">
            ${filteredOrders.length ? (totalRevenue / filteredOrders.length).toFixed(2) : '0.00'}
          </div>
          <div className="analytics-trend">
            Per order average
          </div>
        </div>
        
        <div className="analytics-card">
          <h3>Menu Items</h3>
          <div className="analytics-value">{foodData.length}</div>
          <div className="analytics-trend">
            Total active items
          </div>
        </div>
      </div>
      
      <div className="analytics-row">
        <div className="analytics-card popular-items">
          <h3>Most Popular Items</h3>
          {popularItems.length > 0 ? (
            <ol className="popular-items-list">
              {popularItems.map((item, index) => (
                <li key={index}>
                  <span className="item-name">{item.name}</span>
                  <span className="item-count">{item.count} sold</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="no-data">No order data available for this time period</p>
          )}
          <div className="time-period-note">
            Based on orders from {timeRange === 'day' ? 'the last 24 hours' : 
              timeRange === 'week' ? 'the last 7 days' : 
              timeRange === 'month' ? 'the last 30 days' : 'the last 365 days'}
          </div>
        </div>
        
        <div className="analytics-card order-status">
          <h3>Order Status Distribution</h3>
          <div className="status-bars">
            {['Food Processing', 'Out for delivery', 'Delivered'].map(status => {
              const count = orderStatusCounts[status] || 0;
              // Calculate percentage based on total orders across all statuses
              const percentage = totalOrdersAllStatuses > 0 
                ? Math.round((count / totalOrdersAllStatuses) * 100) 
                : 0;
              
              return (
                <div key={status} className="status-bar-container">
                  <div className="status-label">{status}</div>
                  <div className="status-bar-wrapper">
                    <div 
                      className="status-bar" 
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: status === 'Food Processing' ? '#ffcb6b' : 
                                         status === 'Out for delivery' ? '#64b5f6' : '#81c784'
                      }}
                    ></div>
                  </div>
                  <div className="status-count">{count} ({percentage}%)</div>
                </div>
              );
            })}
          </div>
          <div className="time-period-note">
            Based on orders from {timeRange === 'day' ? 'the last 24 hours' : 
              timeRange === 'week' ? 'the last 7 days' : 
              timeRange === 'month' ? 'the last 30 days' : 'the last 365 days'}
          </div>
        </div>
      </div>

      <div className="analytics-row">
        <div className="analytics-card category-distribution">
          <h3>Category Distribution</h3>
          {categoryOrdersData ? (
            <div className="pie-chart-container">
              <Pie 
                data={categoryOrdersData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        // Use the dark mode context to determine label color
                        color: darkMode ? '#ffffff' : '#333',
                        font: {
                          size: 12
                        },
                        padding: 15
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = Math.round((value / total) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          ) : (
            <p className="no-data">No category data available for this time period</p>
          )}
          <div className="time-period-note">
            Based on orders from {timeRange === 'day' ? 'the last 24 hours' : 
              timeRange === 'week' ? 'the last 7 days' : 
              timeRange === 'month' ? 'the last 30 days' : 'the last 365 days'}
          </div>
        </div>
      </div>
    </div>
  );
};

Analytics.propTypes = {
  url: PropTypes.string.isRequired
};

export default Analytics;
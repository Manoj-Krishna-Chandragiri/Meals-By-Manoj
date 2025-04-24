import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const [foodItems, setFoodItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Use dynamic URL that works for both dev and production
    const url = window.location.hostname === 'localhost' 
        ? "http://localhost:4000" 
        : "https://food-delivery-backend-a3p8.onrender.com";
    
    // Add function to fetch food items
    const fetchFoodItems = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodItems(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    }, [url]);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
        setLoading(false);
    }, [url]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/user/list`);
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    }, [url]);

    useEffect(() => {
        fetchFoodItems();
        fetchOrders();
        fetchUsers();
    }, [fetchFoodItems, fetchOrders, fetchUsers]);

    const contextValue = {
        foodItems,
        setFoodItems,
        fetchFoodItems,
        orders,
        setOrders,
        fetchOrders,
        users,
        setUsers,
        fetchUsers,
        loading,
        url
    };
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
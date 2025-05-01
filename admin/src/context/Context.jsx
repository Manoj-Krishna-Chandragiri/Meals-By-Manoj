import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const [foodItems, setFoodItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = window.location.hostname === 'localhost' 
        ? "http://localhost:4000" 
        : "https://meals-by-manoj-backend.onrender.com";
    
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
            if (error.response && error.response.status === 404) {
                console.log("User list endpoint not available - using empty array");
                setUsers([]);
            }
        }
        setLoading(false);
    }, [url]);

    useEffect(() => {
        fetchFoodItems();
        fetchOrders();
        
        const currentPath = window.location.pathname;
        if (currentPath.includes('user')) {
            fetchUsers();
        }
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
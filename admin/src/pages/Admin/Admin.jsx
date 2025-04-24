import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [foodItems, setFoodItems] = useState([]);
  const url = 'http://localhost:5000';

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
          setFoodItems(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <div>
      <h1>Admin Food Items</h1>
      <ul>
        {foodItems.map((item) => (
          <li key={item._id}>
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
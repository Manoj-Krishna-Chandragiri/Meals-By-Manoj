import { useContext, useEffect } from 'react';
import './ListItems.css';
import { Context } from '../../context/Context';

const ListItems = () => {
  const { foodItems, fetchFoodItems, url } = useContext(Context);
  
  useEffect(() => {
    // Refresh food items when component mounts
    fetchFoodItems();
  }, [fetchFoodItems]);

  const handleDelete = async (id) => {
    try {
      // Call your API to delete the food item
      await fetch(`${url}/api/food/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      // Refresh the food list
      fetchFoodItems();
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  return (
    <div className="list-items">
      <h2>All Foods List</h2>
      
      <table className="foods-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.length > 0 ? (
            foodItems.map((food) => (
              <tr key={food._id}>
                <td>
                  <img 
                    src={`${url}/images/${food.image}`} 
                    alt={food.name} 
                    className="food-image" 
                  />
                </td>
                <td>{food.name}</td>
                <td>{food.category}</td>
                <td>${food.price}</td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No food items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListItems;

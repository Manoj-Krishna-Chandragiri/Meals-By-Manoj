import axios from 'axios';

// Test function to verify the edit endpoint
const testEditEndpoint = async () => {
  const url = 'http://localhost:4000';
  
  try {
    // First get a list of food items
    console.log("Fetching food items list...");
    const foodListResponse = await axios.get(`${url}/api/food/list`);
    
    if (!foodListResponse.data.success || !foodListResponse.data.data.length) {
      console.error("Error: No food items found to test with.");
      return;
    }
    
    // Get the first food item
    const testItem = foodListResponse.data.data[0];
    console.log("Using test item:", testItem);
    
    // Create the edit payload
    const editPayload = {
      id: testItem._id,
      name: `${testItem.name} (Edited)`,
      description: testItem.description,
      price: testItem.price,
      category: testItem.category
    };
    
    console.log("Sending edit request with payload:", editPayload);
    
    // Test the edit endpoint
    const editResponse = await axios.post(`${url}/api/food/edit`, editPayload);
    console.log("Edit response:", editResponse.data);
    
    if (editResponse.data.success) {
      console.log("✅ Edit endpoint is working correctly!");
    } else {
      console.error("❌ Edit endpoint returned success=false:", editResponse.data.message);
    }
  } catch (error) {
    console.error("❌ Error testing edit endpoint:", error.message);
    
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received");
    }
  }
};

// Run the test
console.log("Starting edit endpoint test...");
testEditEndpoint();

// This is a simple script to test the edit endpoint directly

import fetch from 'node-fetch';

const testEditEndpoint = async () => {
  try {
    console.log("Testing edit endpoint...");
    
    // First, get the list of food items
    console.log("Fetching food list...");
    const foodListResponse = await fetch('http://localhost:4000/api/food/list');
    const foodList = await foodListResponse.json();
    
    if (!foodList.success || !foodList.data || foodList.data.length === 0) {
      console.error("No food items found for testing");
      return;
    }
    
    // Select the first food item to test with
    const testItem = foodList.data[0];
    console.log(`Selected test item: ${testItem.name} (${testItem._id})`);
    
    // Create test payload
    const payload = {
      id: testItem._id,
      name: testItem.name + " (Edited)",
      description: testItem.description,
      price: testItem.price,
      category: testItem.category
    };
    
    console.log("Test payload:", payload);
    
    // Send the request
    console.log("Sending POST request to /api/food/edit...");
    const editResponse = await fetch('http://localhost:4000/api/food/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log("Response status:", editResponse.status);
    
    const responseData = await editResponse.json();
    console.log("Response data:", responseData);
    
    if (responseData.success) {
      console.log("✅ Edit endpoint is working correctly!");
    } else {
      console.log("❌ Edit endpoint returned an error:", responseData.message);
    }
  } catch (error) {
    console.error("❌ Error testing edit endpoint:", error.message);
  }
};

testEditEndpoint();

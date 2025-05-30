import fetch from 'node-fetch';
import { connectDB } from './config/db.js';

async function testEditEndpoint() {
    try {
        console.log("Testing the edit endpoint directly...");
        
        const url = 'https://meals-by-manoj-backend.onrender.com';
        
        console.log("\n1. Getting list of food items...");
        const listResponse = await fetch(`${url}/api/food/list`);
        const listData = await listResponse.json();
        
        if (!listData.success || !listData.data || !listData.data.length) {
            console.error("❌ No food items found to test with");
            return;
        }
        
        const foodItem = listData.data[0];
        console.log(`✅ Found item to edit: ${foodItem.name} (ID: ${foodItem._id})`);
        
        const editPayload = {
            id: foodItem._id,
            name: `${foodItem.name} (Edited)`,
            description: foodItem.description,
            price: foodItem.price,
            category: foodItem.category
        };
        
        console.log("\n2. Testing the /api/food/edit endpoint...");
        console.log("Payload:", JSON.stringify(editPayload, null, 2));
        
        const editResponse = await fetch(`${url}/api/food/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editPayload)
        });
        
        console.log("Response status:", editResponse.status);
        console.log("Response headers:", editResponse.headers);
        
        const editData = await editResponse.json();
        console.log("Response body:", JSON.stringify(editData, null, 2));
        
        if (editData.success) {
            console.log("✅ Edit endpoint is working correctly!");
        } else {
            console.error("❌ Edit endpoint returned an error:", editData.message);
        }
        
    } catch (error) {
        console.error("❌ Error testing edit endpoint:", error);
    }
}

console.log("Starting edit endpoint test...");
testEditEndpoint();

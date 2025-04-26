import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to test the MongoDB connection and models
async function testDatabaseModels() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Database connected");
    
    // Define the food schema directly
    const foodSchema = new mongoose.Schema({
      name: {type: String, required: true},
      description: {type: String, required: true},
      price: {type: Number, required: true},
      image: {type: String, required: true},
      category: {type: String, required: true}
    });
    
    // Make sure we're not redefining the model if it already exists
    const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);
    
    // Count documents to verify the model works
    const count = await foodModel.countDocuments();
    console.log(`Found ${count} food items in the database`);
    
    // Test fetching all food items
    const foods = await foodModel.find({}).limit(1);
    console.log("First food item:", foods[0]);
    
    // Test the direct edit logic
    const firstFood = foods[0];
    if (firstFood) {
      console.log("Testing edit functionality with item:", firstFood._id);
      
      // Save original values
      const originalName = firstFood.name;
      const originalDesc = firstFood.description;
      
      // Update the food item
      firstFood.name = `${originalName} (TEST)`;
      firstFood.description = `${originalDesc} (TEST)`;
      
      const savedFood = await firstFood.save();
      console.log("Successfully saved edited food item:", savedFood);
      
      // Restore original values
      firstFood.name = originalName;
      firstFood.description = originalDesc;
      await firstFood.save();
      console.log("Restored original values");
    }
    
    console.log("All database tests passed successfully");
  } catch (error) {
    console.error("Error during database test:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the test
testDatabaseModels().then(() => {
  console.log("Testing complete");
  process.exit(0);
}).catch(error => {
  console.error("Testing failed:", error);
  process.exit(1);
});

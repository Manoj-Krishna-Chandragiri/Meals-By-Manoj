import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testDatabaseModels() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Database connected");
    
    const foodSchema = new mongoose.Schema({
      name: {type: String, required: true},
      description: {type: String, required: true},
      price: {type: Number, required: true},
      image: {type: String, required: true},
      category: {type: String, required: true}
    });
    
    const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);
    
    const count = await foodModel.countDocuments();
    console.log(`Found ${count} food items in the database`);
    
    const foods = await foodModel.find({}).limit(1);
    console.log("First food item:", foods[0]);
    
    const firstFood = foods[0];
    if (firstFood) {
      console.log("Testing edit functionality with item:", firstFood._id);
      
      const originalName = firstFood.name;
      const originalDesc = firstFood.description;
      
      firstFood.name = `${originalName} (TEST)`;
      firstFood.description = `${originalDesc} (TEST)`;
      
      const savedFood = await firstFood.save();
      console.log("Successfully saved edited food item:", savedFood);
      
      firstFood.name = originalName;
      firstFood.description = originalDesc;
      await firstFood.save();
      console.log("Restored original values");
    }
    
    console.log("All database tests passed successfully");
  } catch (error) {
    console.error("Error during database test:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

testDatabaseModels().then(() => {
  console.log("Testing complete");
  process.exit(0);
}).catch(error => {
  console.error("Testing failed:", error);
  process.exit(1);
});

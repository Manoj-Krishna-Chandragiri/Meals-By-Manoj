import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import categoryModel from "./models/categoryModel.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug middleware to log all incoming requests with full details
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    if (req.method !== 'GET') {
        console.log('Request Body:', req.body);
    }
    
    // Track response for logging
    const originalSend = res.send;
    res.send = function(body) {
        console.log(`Response Status: ${res.statusCode}`);
        if (body && typeof body === 'string' && body.length < 1000) {
            console.log('Response Body:', body);
        } else {
            console.log('Response Body: [Large response]');
        }
        return originalSend.call(this, body);
    };
    
    next();
});

// Connect to MongoDB
connectDB();

// Define the food edit endpoint directly in the main app
// This ensures it's available and working properly
app.post("/api/food/edit", async (req, res) => {
    console.log("Direct food edit endpoint called with data:", req.body);
    
    try {
        const { id, name, description, price, category } = req.body;
        
        // Validate required fields
        if (!id || !name || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                received: req.body
            });
        }

        // Ensure we're using a properly initialized foodModel
        const foodModel = mongoose.models.food || mongoose.model('food');
        
        // Find the food item by ID
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found with ID: " + id
            });
        }

        console.log("Found food item:", food);
        
        // Update the food item
        food.name = name;
        food.description = description;
        food.price = Number(price);
        food.category = category;
        
        // Save the updated food item
        const updatedFood = await food.save();
        console.log("Updated food item:", updatedFood);
        
        // Check if category exists, if not add it
        const categoryModel = mongoose.models.category || mongoose.model('category');
        const categoryExists = await categoryModel.findOne({ name: category });
        if (!categoryExists) {
            console.log("Adding new category:", category);
            const newCategory = new categoryModel({ name: category });
            await newCategory.save();
        }
        
        res.json({
            success: true,
            message: "Food item updated successfully",
            updatedFood: updatedFood
        });
    } catch (error) {
        console.error("Error in edit endpoint:", error);
        res.status(500).json({
            success: false,
            message: "Error updating food item",
            error: error.message
        });
    }
});

// Simple check endpoint for debugging
app.get("/api/food/edit/check", (req, res) => {
    res.json({
        success: true,
        message: "Edit check endpoint is working"
    });
});

// Mount all API routes
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Basic test endpoint that confirms server is running
app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "API is working",
        dbConnected: mongoose.connection.readyState === 1
    });
});

// Root endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

// Error handling middleware 
app.use((err, req, res, next) => {
    console.error("Global error handler caught:", err);
    res.status(500).json({
        success: false,
        message: "Server error: " + (err.message || "Unknown error")
    });
});

// 404 handler for routes that don't exist
app.use((req, res) => {
    console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
        availableEndpoints: "GET /api-docs for available endpoints"
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
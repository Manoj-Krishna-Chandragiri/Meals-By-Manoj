import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Try to connect to MongoDB Atlas
        await mongoose.connect('mongodb+srv://manojkrishna991:Manoj_991@cluster0.8rrk6th.mongodb.net/food-delivery', {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        });
        console.log("DB Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB Atlas Connection Error: ", error);
        
        // Fallback to local MongoDB if Atlas connection fails
        try {
            console.log("Attempting to connect to local MongoDB...");
            await mongoose.connect('mongodb://localhost:27017/food-delivery', {
                serverSelectionTimeoutMS: 5000,
            });
            console.log("DB Connected to local MongoDB");
        } catch (localError) {
            console.error("Local MongoDB Connection Error: ", localError);
            process.exit(1); // Exit if no database connection is possible
        }
    }
}
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectionOptions = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    heartbeatFrequencyMS: 30000,
    retryWrites: true,
    w: 'majority',
    family: 4
};

const maxRetries = 3;

export const connectDB = async (retryCount = 0) => {
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://manojkrishna991:Manoj_991@cluster0.8rrk6th.mongodb.net/food-delivery';
        
        const conn = await mongoose.connect(mongoUri, connectionOptions);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });
        
        return conn;
    } catch (error) {
        console.error("MongoDB Atlas Connection Error:", error);
        
        if (retryCount < maxRetries) {
            console.log(`Retrying connection (${retryCount + 1}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectDB(retryCount + 1);
        }
        
        try {
            console.log("Attempting to connect to local MongoDB...");
            const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/food-delivery', {
                serverSelectionTimeoutMS: 5000
            });
            
            console.log(`Connected to local MongoDB: ${localConn.connection.host}`);
            return localConn;
        } catch (localError) {
            console.error("Local MongoDB Connection Error:", localError);
            console.error("========================================");
            console.error("  Database Connection Failed");
            console.error("  Please check that MongoDB is running");
            console.error("========================================");
            process.exit(1);
        }
    }
};
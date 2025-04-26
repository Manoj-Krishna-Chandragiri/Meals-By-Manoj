import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// Set mongoose options globally
mongoose.set('strictQuery', false);

// Connection options with increased timeouts
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increased from 10000
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    heartbeatFrequencyMS: 30000,
    retryWrites: true,
    w: 'majority',
    family: 4 // Force IPv4
};

// Retry mechanism for DB connection
const maxRetries = 3;

export const connectDB = async (retryCount = 0) => {
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        
        // Get MongoDB URI from env or use default
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://manojkrishna991:Manoj_991@cluster0.8rrk6th.mongodb.net/food-delivery';
        
        // Attempt connection
        const conn = await mongoose.connect(mongoUri, connectionOptions);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Set up event listeners for connection issues
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });
        
        return conn;
    } catch (error) {
        console.error("MongoDB Atlas Connection Error:", error);
        
        // If we haven't exceeded max retries, try again
        if (retryCount < maxRetries) {
            console.log(`Retrying connection (${retryCount + 1}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
            return connectDB(retryCount + 1);
        }
        
        // If Atlas connection fails after retries, try local MongoDB
        try {
            console.log("Attempting to connect to local MongoDB...");
            const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/food-delivery', {
                ...connectionOptions,
                serverSelectionTimeoutMS: 5000 // Shorter timeout for local
            });
            
            console.log(`Connected to local MongoDB: ${localConn.connection.host}`);
            return localConn;
        } catch (localError) {
            console.error("Local MongoDB Connection Error:", localError);
            console.error("========================================");
            console.error("  Database Connection Failed");
            console.error("  Please check that MongoDB is running");
            console.error("========================================");
            process.exit(1); // Exit if no database connection is possible
        }
    }
};
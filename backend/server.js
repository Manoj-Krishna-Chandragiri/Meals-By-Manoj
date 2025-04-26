import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug middleware to log all incoming requests - MOVED BEFORE ROUTES
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - Body:`, req.body);
    next();
});

// db connection
connectDB();

// Print all registered routes for debugging
const printRoutes = (router, basePath = '') => {
    router.stack.forEach(layer => {
        if (layer.route) {
            const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
            console.log(`${methods} ${basePath}${layer.route.path}`);
        } else if (layer.name === 'router' && layer.handle.stack) {
            printRoutes(layer.handle, basePath + layer.regexp.source.replace(/\\\//g, '/').replace(/\^|\/\?\(\?\:/g, '').replace(/\\\.\(\?\:/g, '.').replace(/\(\?:.*\)/g, ''));
        }
    });
};

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Print all registered routes
console.log("=== Registered Routes ===");
printRoutes(app._router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Global error handler:", err.stack);
    res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
    });
});

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
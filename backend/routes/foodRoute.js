import express from "express";
import { addFood, listFood, removeFood, editFood, getCategories, addCategory, removeCategory } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Basic middleware for debugging routes
foodRouter.use((req, res, next) => {
    console.log(`Food Router: ${req.method} ${req.url}`);
    next();
});

// Food item routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

// Note: the /edit route is handled directly in server.js to avoid routing conflicts

// Debug route that works reliably
foodRouter.get("/edit/check", (req, res) => {
    res.json({
        success: true,
        message: "Edit check endpoint is working"
    });
});

// Category management routes
foodRouter.get("/categories", getCategories);
foodRouter.post("/addCategory", addCategory);
foodRouter.post("/removeCategory", removeCategory);

// Log all registered food routes for debugging
console.log("Food router routes:");
foodRouter.stack.forEach(r => {
    if (r.route && r.route.path) {
        const methods = Object.keys(r.route.methods).join(', ').toUpperCase();
        console.log(`${methods} /api/food${r.route.path}`);
    }
});

export default foodRouter;
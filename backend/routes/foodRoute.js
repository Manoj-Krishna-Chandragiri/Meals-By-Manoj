import express from "express";
import { addFood, listFood, removeFood, getCategories, addCategory, removeCategory } from "../controllers/foodController.js";
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

// Category management routes
foodRouter.get("/categories", getCategories);
foodRouter.post("/addCategory", addCategory);
foodRouter.post("/removeCategory", removeCategory); // This is the route that's not being hit

// Log all registered food routes for debugging
console.log("Food router routes:");
foodRouter.stack.forEach(r => {
    if (r.route && r.route.path) {
        console.log(`${Object.keys(r.route.methods)[0].toUpperCase()} /api/food${r.route.path}`);
    }
});

export default foodRouter;
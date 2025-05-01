import express from "express";
import { addFood, listFood, removeFood, editFood, getCategories, addCategory, removeCategory } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

foodRouter.use((req, res, next) => {
    console.log(`Food Router: ${req.method} ${req.url}`);
    next();
});

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

foodRouter.get("/edit/check", (req, res) => {
    res.json({
        success: true,
        message: "Edit check endpoint is working"
    });
});

foodRouter.get("/categories", getCategories);
foodRouter.post("/addCategory", addCategory);
foodRouter.post("/removeCategory", removeCategory);

console.log("Food router routes:");
foodRouter.stack.forEach(r => {
    if (r.route && r.route.path) {
        const methods = Object.keys(r.route.methods).join(', ').toUpperCase();
        console.log(`${methods} /api/food${r.route.path}`);
    }
});

export default foodRouter;
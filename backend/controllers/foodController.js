import foodModel from "../models/foodModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';

//add food item
const addFood = async (req,res) => {
      let image_filename = `${req.file.filename}`;
      const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
      });
      
      try {
        await food.save();
        
        // Check if category exists, if not add it
        const categoryExists = await categoryModel.findOne({ name: req.body.category });
        if (!categoryExists) {
          const newCategory = new categoryModel({ name: req.body.category });
          await newCategory.save();
        }
        
        res.json({success: true, message: "Food Added"});
      } catch(error) {
        console.log(error);
        res.json({success: false, message: "Error"});
      }
}

//all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

//remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food && food.image) {
            fs.unlink(`uploads/${food.image}`, () => {});
        }
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// Edit food item
const editFood = async (req, res) => {
    console.log("Edit food endpoint called with data:", req.body);
    
    try {
        const { id, name, description, price, category } = req.body;
        
        // Validate required fields
        if (!id || !name || !description || price === undefined || !category) {
            return res.json({
                success: false,
                message: "Missing required fields",
                received: { id, name, description, price, category }
            });
        }

        // Find the food item by ID
        const food = await foodModel.findById(id);
        if (!food) {
            return res.json({
                success: false,
                message: "Food item not found with ID: " + id
            });
        }

        console.log("Found food item to update:", food);

        // Update the food item
        food.name = name;
        food.description = description;
        food.price = Number(price);
        food.category = category;

        // Save the updated food item
        const updatedFood = await food.save();
        console.log("Food item updated successfully:", updatedFood);

        // Check if category exists, if not add it
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
        console.error("Error updating food item:", error);
        res.status(500).json({
            success: false,
            message: "Error updating food item: " + error.message,
            error: error.stack
        });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).distinct('name');
        
        // If no categories exist yet in the database, return default categories
        if (!categories || categories.length === 0) {
            const defaultCategories = [
                "Salad", "Rolls", "Deserts", "Sandwich", 
                "Cake", "Pure Veg", "Pasta", "Noodles", "Biryani"
            ];
            return res.json({success: true, categories: defaultCategories});
        }
        
        res.json({success: true, categories});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error fetching categories"});
    }
};

// Add a new category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Check if category already exists
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.json({success: false, message: "Category already exists"});
        }
        
        // Create new category
        const newCategory = new categoryModel({ name });
        await newCategory.save();
        
        // Return all categories including the new one
        const allCategories = await categoryModel.find({}).distinct('name');
        
        res.json({
            success: true, 
            message: "Category added successfully",
            categories: allCategories
        });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error adding category"});
    }
};

// Remove a category
const removeCategory = async (req, res) => {
    try {
        console.log("removeCategory function called with body:", req.body);
        
        if (!req.body || !req.body.name) {
            console.error("Missing name in request body");
            return res.status(400).json({
                success: false, 
                message: "Category name is required"
            });
        }
        
        const { name } = req.body;
        console.log(`Attempting to delete category: "${name}"`);
        
        // Check if category exists in database
        const existingCategory = await categoryModel.findOne({ name });
        console.log("Category found:", existingCategory);
        
        if (!existingCategory) {
            return res.json({
                success: false, 
                message: `Category "${name}" not found`
            });
        }
        
        // Check if there are food items using this category
        const foodItemsWithCategory = await foodModel.countDocuments({ category: name });
        if (foodItemsWithCategory > 0) {
            return res.json({
                success: false, 
                message: `Cannot remove category "${name}" because it has ${foodItemsWithCategory} food items. Please reassign or delete those items first.`
            });
        }
        
        // Delete the category
        const result = await categoryModel.deleteOne({ name });
        console.log("Delete result:", result);
        
        if (result.deletedCount === 0) {
            return res.json({
                success: false, 
                message: `Failed to delete category "${name}"`
            });
        }
        
        // Return remaining categories
        const allCategories = await categoryModel.find({}).distinct('name');
        
        return res.json({
            success: true, 
            message: `Category "${name}" removed successfully`,
            categories: allCategories
        });
    } catch (error) {
        console.error("Error in removeCategory:", error);
        return res.status(500).json({
            success: false, 
            message: "Server error: " + error.message
        });
    }
};

export { addFood, listFood, removeFood, editFood, getCategories, addCategory, removeCategory };
import foodModel from "../models/foodModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';

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

const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

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

const editFood = async (req, res) => {
    console.log("Edit food endpoint called with data:", req.body);
    
    try {
        const { id, name, description, price, category } = req.body;
        
        if (!id || !name || !description || price === undefined || !category) {
            return res.json({
                success: false,
                message: "Missing required fields",
                received: { id, name, description, price, category }
            });
        }

        const food = await foodModel.findById(id);
        if (!food) {
            return res.json({
                success: false,
                message: "Food item not found with ID: " + id
            });
        }

        console.log("Found food item to update:", food);

        food.name = name;
        food.description = description;
        food.price = Number(price);
        food.category = category;

        const updatedFood = await food.save();
        console.log("Food item updated successfully:", updatedFood);

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

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).distinct('name');
        
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

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.json({success: false, message: "Category already exists"});
        }
        
        const newCategory = new categoryModel({ name });
        await newCategory.save();
        
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
        
        const existingCategory = await categoryModel.findOne({ name });
        console.log("Category found:", existingCategory);
        
        if (!existingCategory) {
            return res.json({
                success: false, 
                message: `Category "${name}" not found`
            });
        }
        
        const foodItemsWithCategory = await foodModel.countDocuments({ category: name });
        if (foodItemsWithCategory > 0) {
            return res.json({
                success: false, 
                message: `Cannot remove category "${name}" because it has ${foodItemsWithCategory} food items. Please reassign or delete those items first.`
            });
        }
        
        const result = await categoryModel.deleteOne({ name });
        console.log("Delete result:", result);
        
        if (result.deletedCount === 0) {
            return res.json({
                success: false, 
                message: `Failed to delete category "${name}"`
            });
        }
        
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
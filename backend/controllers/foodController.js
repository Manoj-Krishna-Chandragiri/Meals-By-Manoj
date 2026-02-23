const fs = require('fs');
const path = require('path');
const foodModel = require('../models/foodModel');

// Categories that ship with the app and cannot be deleted
const DEFAULT_CATEGORIES = [
  'Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake',
  'Pure Veg', 'Pasta', 'Noodles', 'Biryani'
];

// ── Add food item ─────────────────────────────────────────
const addFood = async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: 'Image is required' });
  }

  try {
    const food = new foodModel({
      name:        req.body.name,
      description: req.body.description,
      price:       Number(req.body.price),
      image:       req.file.filename,
      category:    req.body.category
    });
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error adding food item' });
  }
};

// ── List all food items ───────────────────────────────────
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching food list' });
  }
};

// ── Remove food item ──────────────────────────────────────
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: 'Food item not found' });
    }

    // Delete associated image from disk
    const imagePath = path.join(__dirname, '..', 'uploads', food.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error removing food item' });
  }
};

// ── Edit food item ────────────────────────────────────────
const editFood = async (req, res) => {
  try {
    const updateData = {
      name:        req.body.name,
      description: req.body.description,
      price:       Number(req.body.price),
      category:    req.body.category
    };

    // Replace image only if a new one was uploaded
    if (req.file) {
      const existing = await foodModel.findById(req.body.id);
      if (existing && existing.image) {
        const oldPath = path.join(__dirname, '..', 'uploads', existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.image = req.file.filename;
    }

    const updated = await foodModel.findByIdAndUpdate(req.body.id, updateData, { new: true });
    if (!updated) {
      return res.json({ success: false, message: 'Food item not found' });
    }
    res.json({ success: true, message: 'Food Updated', data: updated });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating food item' });
  }
};

// ── Get all categories (DB union with defaults) ───────────
const getCategories = async (req, res) => {
  try {
    const dbCategories = await foodModel.distinct('category');
    const all = [...new Set([...DEFAULT_CATEGORIES, ...dbCategories])];
    res.json({ success: true, categories: all });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching categories' });
  }
};

// ── Add category (validated client-side, stored implicitly via food items) ─
const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.json({ success: false, message: 'Category name is required' });
  }
  res.json({ success: true, message: 'Category ready', category: name.trim() });
};

// ── Remove category (only if unused and non-default) ─────
const removeCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.json({ success: false, message: 'Category name is required' });
  }
  if (DEFAULT_CATEGORIES.includes(name)) {
    return res.json({ success: false, message: 'Cannot remove a default category' });
  }

  try {
    const count = await foodModel.countDocuments({ category: name });
    if (count > 0) {
      return res.json({
        success: false,
        message: `Cannot remove "${name}": ${count} food item(s) still use it`
      });
    }

    const remaining = await foodModel.distinct('category');
    const allRemaining = [...new Set([...DEFAULT_CATEGORIES, ...remaining])].filter(c => c !== name);
    res.json({ success: true, message: 'Category removed', category: name, categories: allRemaining });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error removing category' });
  }
};

module.exports = { addFood, listFood, removeFood, editFood, getCategories, addCategory, removeCategory };

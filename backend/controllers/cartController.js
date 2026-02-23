const userModel = require('../models/userModel');

// ── Add item to cart ──────────────────────────────────────
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = user.cartData || {};
    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Added to Cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating cart' });
  }
};

// ── Remove one unit of item from cart ─────────────────────
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = user.cartData || {};
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Removed from Cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating cart' });
  }
};

// ── Get current cart ──────────────────────────────────────
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const loadCartData = user.cartData || {};
    res.json({ success: true, loadCartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching cart' });
  }
};

module.exports = { addToCart, removeFromCart, getCart };

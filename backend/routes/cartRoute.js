const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');

router.post('/add',    authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);
router.post('/get',    authMiddleware, getCart);

module.exports = router;

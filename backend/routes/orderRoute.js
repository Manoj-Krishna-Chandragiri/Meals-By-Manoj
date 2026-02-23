const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } = require('../controllers/orderController');

router.post('/place',      authMiddleware, placeOrder);
router.post('/verify',     verifyOrder);
router.get('/list',        listOrders);
router.post('/userorders', authMiddleware, userOrders);
router.post('/status',     updateStatus);

module.exports = router;

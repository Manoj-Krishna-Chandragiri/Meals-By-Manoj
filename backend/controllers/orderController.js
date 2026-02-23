const Stripe = require('stripe');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

// ── Place order + create Stripe checkout session ──────────
const placeOrder = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

  try {
    const newOrder = new orderModel({
      userId:  req.body.userId,
      items:   req.body.items,
      amount:  req.body.amount,
      address: req.body.address
    });
    await newOrder.save();

    // Clear cart after order is placed
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency:     'usd',
        product_data: { name: item.name },
        unit_amount:  Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));

    // Delivery fee line item
    line_items.push({
      price_data: {
        currency:     'usd',
        product_data: { name: 'Delivery Charges' },
        unit_amount:  200
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode:        'payment',
      success_url: `${FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:  `${FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error placing order' });
  }
};

// ── Verify Stripe payment callback ───────────────────────
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: 'Payment confirmed' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: 'Payment cancelled, order removed' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error verifying order' });
  }
};

// ── Get all orders for the current user ───────────────────
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching orders' });
  }
};

// ── Admin: list all orders ────────────────────────────────
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching orders' });
  }
};

// ── Admin: update order status ────────────────────────────
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating status' });
  }
};

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const foodRouter = require('./routes/foodRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ────────────────────────────────────────────
app.use(express.json());
app.use(cors());

// Serve uploaded food images at /images/<filename>
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// ── Database ──────────────────────────────────────────────
connectDB();

// ── Routes ────────────────────────────────────────────────
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('Food Delivery API is running');
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

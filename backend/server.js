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

// ── CORS ─────────────────────────────────────────────────
// Build allowed-origins list from env so Render env vars control it
const allowedOrigins = [
  'http://localhost:5173',   // frontend dev
  'http://localhost:5174',   // admin dev
  'http://localhost:4000',
];

// Add production origins from env vars (space- or comma-separated)
if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL.split(/[,\s]+/).forEach(o => allowedOrigins.push(o.trim()));
}
if (process.env.ADMIN_URL) {
  process.env.ADMIN_URL.split(/[,\s]+/).forEach(o => allowedOrigins.push(o.trim()));
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'token', 'Authorization']
}));

// ── Middleware ────────────────────────────────────────────
app.use(express.json());

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
  res.json({ success: true, message: 'Food Delivery API is running' });
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});

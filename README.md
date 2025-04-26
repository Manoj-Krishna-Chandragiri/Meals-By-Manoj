# Food Delivery Application

A full-stack food delivery application with customer-facing frontend, admin panel, and backend API.

## Project Structure

- `/frontend` - Customer-facing React application
- `/admin` - Admin panel for food, category, and order management
- `/backend` - Express.js API server with MongoDB database

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- MongoDB (local or Atlas connection)
- NPM or Yarn

### Installation

1. Clone the repository
2. Install dependencies for each application:

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend && npm install

# Admin panel dependencies
cd admin && npm install

# Frontend dependencies
cd frontend && npm install
```

3. Set up environment variables:
   - Create a `.env` file in the `backend` folder with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

### Running the Application

#### Option 1: Using the start script (recommended)

Run all services at once:

```bash
node start.js
```

#### Option 2: Starting services individually

1. Start the backend:
```bash
cd backend && npm run dev
```

2. Start the admin panel:
```bash
cd admin && npm run dev
```

3. Start the customer frontend:
```bash
cd frontend && npm run dev
```

## Application URLs

- Backend API: http://localhost:4000
- Admin Panel: http://localhost:5174
- Customer Frontend: http://localhost:5173

## Troubleshooting

- **Backend Fails to Start**: Check MongoDB connection in `.env` file
- **401 Unauthorized Errors**: Make sure JWT_SECRET is properly set
- **Image Upload Issues**: Make sure the `uploads` directory exists in the backend folder

## Features

### Customer Frontend

- Browse food menu by categories
- Search food items
- Add items to cart
- Place orders with secure checkout
- View order history

### Admin Panel

- Add/remove food items
- Manage food categories
- View and manage orders
- Update order status
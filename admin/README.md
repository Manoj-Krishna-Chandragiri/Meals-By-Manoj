# Meals By Manoj - Admin Panel

Admin panel for managing the Meals By Manoj restaurant website.

## Environment Setup

For local development, create a `.env` file in the root directory with the following variables:

```
VITE_ADMIN_EMAIL=mealsbymanoj@gmail.com
VITE_ADMIN_PASSWORD=your_secure_password
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Build for Production

```bash
npm run build
```

## Security Note

The admin credentials are stored in environment variables for security. Never commit the `.env` file to version control. For production deployment, set these variables in your hosting platform's environment configuration.

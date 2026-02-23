const jwt = require('jsonwebtoken');

/**
 * Verifies the JWT token from request headers and attaches
 * the decoded userId to req.body so protected routes can use it.
 */
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: 'Not authorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.json({ success: false, message: 'Invalid or expired token. Please log in again.' });
  }
};

module.exports = authMiddleware;

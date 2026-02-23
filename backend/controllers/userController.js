const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userModel = require('../models/userModel');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// ── Login ─────────────────────────────────────────────────
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error during login' });
  }
};

// ── Register ──────────────────────────────────────────────
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'An account with this email already exists' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email address' });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error during registration' });
  }
};

module.exports = { loginUser, registerUser };

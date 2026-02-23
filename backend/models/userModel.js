const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
  },
  { minimize: false }  // Persist empty cartData object to MongoDB
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = userModel;

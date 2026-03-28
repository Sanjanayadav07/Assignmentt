const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { validationResult } = require('express-validator');

const register = asyncHandler(async (req, res) => {
  try {
    console.log("📩 BODY:", req.body);

    const { email, password, role, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role?.toLowerCase() || 'user'
    });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    console.log("🔥 EXACT ERROR:", error); // 👈 THIS IS KEY
    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // fixed 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.status(statusCode)
    .json({
      success: true,
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
};


module.exports = { register, login };
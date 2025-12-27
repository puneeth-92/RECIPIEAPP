const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch {
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/"
  });

  res.json({ message: "Logged out" });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

module.exports = router;
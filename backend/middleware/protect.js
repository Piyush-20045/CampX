const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // attach user (with _id, name, email), but keep password out
    req.user = await User.findById(verified.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = protect;  

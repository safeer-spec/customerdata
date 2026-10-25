const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }
    const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User no longer exists" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;

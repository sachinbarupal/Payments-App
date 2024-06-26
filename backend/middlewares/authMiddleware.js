const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(403).json({ message: "Invalid Token !!" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId)
      return res.status(403).json({ message: "Invalid Token !!" });

    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("Error in Authorization !!");
    console.log(err);
    res.status(403).json({ message: "Error in Authorization !!" });
  }
};

module.exports = authMiddleware;

import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Authorization" header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); // Verify the token
    const user = await User.findOne({ email: decoded.email }); // Find the user associated with the token

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

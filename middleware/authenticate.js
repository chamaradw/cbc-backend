import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("❌ No authentication token provided.");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      console.log("❌ Invalid token:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

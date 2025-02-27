import LoginLog from "../models/LoginLog.js";

// Get Login Logs (Admin Only)
export async function getLoginLogs(req, res) {
  try {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const logs = await LoginLog.find().sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching login logs:", error);
    res.status(500).json({
      message: "Internal server error",
      error: "Something went wrong. Please try again later.",
    });
  }
}

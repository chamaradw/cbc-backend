import LoginLog from "../models/LoginLog.js";

// Get Login Logs (Admin Only)
export async function getLoginLogs(req, res) {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }

  try {
    const logs = await LoginLog.find().sort({ timestamp: -1 }); // ✅ Sort by newest first
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching login logs:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

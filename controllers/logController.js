import LoginLog from "../models/LoginLog.js";

// ✅ Get Login Logs (Admin Only)
export async function getLoginLogs(req, res) {
  console.log("✅ getLoginLogs function called!"); // Debugging log

  try {
    if (!req.user || req.user.type !== "admin") {
      console.log("❌ Forbidden: Admin access required");
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const logs = await LoginLog.find().sort({ createdAt: -1 }); 
    res.status(200).json(logs);
  } catch (error) {
    console.error("❌ Error fetching login logs:", error);
    res.status(500).json({
      message: "Internal server error",
      error: "Something went wrong. Please try again later.",
    });
  }
}

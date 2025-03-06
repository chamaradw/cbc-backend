import LoginLog from "../models/LoginLog.js";

// ✅ Get Login Logs (Admin Only)
export async function getLoginLogs(req, res) {
  console.log("✅ getLoginLogs function was called!");

  try {
    if (!req.user || req.user.type !== "admin") {
      console.log("❌ Forbidden: Admin access required");
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const logs = await LoginLog.find().sort({ createdAt: -1 });
    // console.log("✅ Successfully retrieved logs:", logs);
    res.status(200).json(logs);
  } catch (error) {
    console.error("❌ Error fetching login logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getLoginStats(req, res) {
  console.log("✅ getLoginStats function was called!");

  try {
    // Ensure only admins can access
    if (!req.user || req.user.type !== "admin") {
      console.log("❌ Forbidden: Admin access required");
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    // Count successful and failed logins
    const successCount = await LoginLog.countDocuments({ status: "Success" });
    const failedCount = await LoginLog.countDocuments({ status: "Failure" });

    console.log(`✅ Success: ${successCount}, Failure: ${failedCount}`);

    res.status(200).json({ success: successCount, failed: failedCount });
  } catch (error) {
    console.error("❌ Error fetching login stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
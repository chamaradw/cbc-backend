import express from "express";
import { getLoginLogs } from "../controllers/logController.js";
import { authenticate } from "../middleware/authenticate.js";

const logRouter = express.Router();

// ✅ Secure route with authentication middleware
logRouter.get("/login-logs", authenticate, getLoginLogs);

export default logRouter;

import express from "express";
import { getLoginLogs } from "../controllers/logController.js";
import { authenticate } from "../middleware/authenticate.js";

const logRouter = express.Router();

logRouter.get("/login-logs", authenticate, getLoginLogs); // ✅ Admin-only access

export default logRouter;

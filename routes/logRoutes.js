import express from "express";
import { getLoginLogs } from "../controllers/logController.js";
import { authenticate } from "../middleware/authenticate.js";
import { getLoginStats } from "../controllers/logController.js";



const logRouter = express.Router();


logRouter.get("/", authenticate, getLoginLogs);
logRouter.get("/stats", authenticate, getLoginStats);
export default logRouter;


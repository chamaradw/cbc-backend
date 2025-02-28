import express from "express";
import { getLoginLogs } from "../controllers/logController.js";
import { authenticate } from "../middleware/authenticate.js";

const logRouter = express.Router();


logRouter.get("/logs", authenticate, getLoginLogs);

export default logRouter;

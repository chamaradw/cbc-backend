import express from "express";
import { createUser, loginUser, getUser, getAllUsers } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";

const userRouter = express.Router();

userRouter.post("/createUser", authenticate, createUser); // Requires authentication
userRouter.post("/login", loginUser);                     // Public route
userRouter.get("/", authenticate, getUser);               // Requires authentication
userRouter.get("/all", authenticate, getAllUsers);        // Requires authentication

export default userRouter;

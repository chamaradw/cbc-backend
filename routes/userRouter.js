import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)


export default userRouter;
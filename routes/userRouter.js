import express from 'express';
import { createUser, loginUser ,getUser} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.get("/", getUser)

export default userRouter;
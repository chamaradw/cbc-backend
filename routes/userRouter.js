import express from 'express';
import { createUser, loginUser ,upd} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser)
userRouter.post("/login", loginUser)

export default userRouter;
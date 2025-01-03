import express from 'express';
import { createUser, loginUser ,getUser, getAllUsers} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/createUser", createUser)
userRouter.post("/login", loginUser)
userRouter.get("/", getUser)
userRouter.get("/all", getAllUsers)

export default userRouter;
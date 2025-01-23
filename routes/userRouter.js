import express from "express";
import { createUser, loginUser, getUser, getAllUsers, deleteUser, googleLogin } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";

const userRouter = express.Router();

userRouter.post("/createUser", createUser) 
userRouter.post("/login", loginUser);                     
userRouter.get("/", authenticate, getUser);               
userRouter.get("/all", authenticate, getAllUsers);        
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.post("google", googleLogin);


export default userRouter;

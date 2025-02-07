import express from "express";
import { createUser, loginUser, getUser, getAllUsers, deleteUser, googleLogin,getUserProfile  } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";


const userRouter = express.Router();

userRouter.post("/createUser", createUser) 
userRouter.post("/login", loginUser);    
userRouter.post("/google", googleLogin);                 
userRouter.get("/getUser");               
userRouter.get("/all", authenticate, getAllUsers);        
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.get("/profile", authenticate, getUserProfile);
<<<<<<< HEAD
=======

>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c



export default userRouter;

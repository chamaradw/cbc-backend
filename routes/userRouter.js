import express from "express";
import { createUser, loginUser, getUser, getAllUsers, deleteUser, googleLogin,getUserProfile  } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { updateUser } from "../controllers/userController.js";
import { getUserStats } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/createUser",createUser) 
userRouter.post("/login", loginUser);    
userRouter.post("/google", googleLogin);                 
userRouter.get("/getUser", authenticate, getUser);               
userRouter.get("/all", authenticate, getAllUsers);        
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.get("/profile", authenticate, getUserProfile);
userRouter.put("/update/:email", authenticate, updateUser);
userRouter.get("/stats", authenticate, getUserStats);





export default userRouter;

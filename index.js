import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRoutes from './routes/orderRouter.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import cors   from "cors";
import {wishlistRoutes } from '../routes/wishlistRoutes.js';


dotenv.config()

const app = express();
const mongoUrl = process.env.MONGO_DB_URI
mongoose.connect(mongoUrl,{})
const connection = mongoose.connection;
connection.once("open",()=>
{
  console.log("Connection to the mongoDB is successfully established. !");
})
app.use(bodyParser.json())
app.use(
  (req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","")
    console.log(token)
    if(token != null)
    {
      jwt.verify(token,process.env.SECRET , (error,decoded)=>
      {
        if(!error){req.user = decoded}
      })
    }
    next()
  }
)
app.use(cors())
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)
app.use("/api/orders",orderRoutes)
app.use('/api/wishlist', wishlistRoutes);
app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)


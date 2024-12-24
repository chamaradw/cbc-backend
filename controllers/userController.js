import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export function createUser(req,res){

  const newUserData = req.body

  if(newUserData.type == "admin"){

    if(req.user==null){
      res.json({
        message: "Please login as administrator to create admin accounts"
      })
      return
    }

    if(req.user.type != "admin"){
      res.json({
        message: "Please login as administrator to create admin accounts"
      })
      return
    }

  }

  newUserData.password = bcrypt.hashSync(newUserData.password, 10)  

  const user = new User(newUserData)

  user.save().then(()=>{
    res.json({
      message: "User created"
    })
  }).catch((error)=>{
    res.json({      
      message: "User not created"
    })
  })
  
}

export function loginUser(req,res){

  User.find({email : req.body.email}).then(
    (users)=>{
      if(users.length == 0){res.json({message: "User not found"})}
      else
      {
        const user = users[0]
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
        if(isPasswordCorrect)
        {
            const token = jwt.sign(
            {
              email : user.email,
              firstName : user.firstName,
              lastName : user.lastName,
              isBlocked : user.isBlocked,
              type : user.type,
              profilePicture : user.profilePicture
            },process.env.SECRET)
          
            res.json({message: "User logged in",
              token: token
            })
          
        }
        else
        {
          res.json({message: "User not logged in (wrong password)"})
        }
      }
    }
  )
}

export function isAdmin(req)
{
  if(req.user==null)
  {return false}

  if(req.user.type != "admin")
  {return false}
  return true
}

export function isCustomer(req)
{
  if(req.user==null)
  {
    return false
  }

  if(req.user.type != "customer")
  {
    return false
  }
  return true
}

export function getUser(req, res) {
  if (!req.user) {return res.status(401).json({ message: "Unauthorized: No user logged in" });}

  // Exclude sensitive data from the user object
  const { password, ...safeUserData } = req.user.toObject ? req.user.toObject() : req.user;
  res.status(200).json(safeUserData);
  console.log(req.user)
}

export function getAllUsers(req, res) {
  // Check if the requester has admin privileges
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }

  User.find()
    .then((users) => {
      // Exclude sensitive fields like passwords
      const sanitizedUsers = users.map((user) => {
        const { password, ...safeUserData } = user.toObject();
        return safeUserData;
      });

      res.status(200).json(sanitizedUsers);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving users",
        error: error.message,
      });
     
    });
    console.error(error);
}

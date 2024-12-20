import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export function createUser(req,res){

  const newUserData = req.body
  if(newUserData.type == "admin"){

    if(req.user==null){
      response.json({
        message : "You are not authorized to create an admin,Please login as an admin to create an admin accounts"
      })
    
  }
    if (req.user?.type != "admin") {
      res.json({
        message: "You are not authorized to create an admin,Please login as an admin to create an admin accounts"
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
      if(users.length == 0){

        res.json({
          message: "User not found"
        })

      }else{

        const user = users[0]

        const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

        if(isPasswordCorrect){

          const token = jwt.sign({
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            isBlocked : user.isBlocked,
            type : user.type,
            profilePicture : user.profilePicture
          } , process.env.SECRET)
          
          res.json({
            message: "User logged in",
            token: token
          })
          
        }else{
          res.json({
            message: "User not logged in (wrong password)"
          })
        }
      }
    }
  )
}


export function logoutUser(req, res) {
  try {
    // Remove the token from client-side storage by sending a response
    res.json({
      message: "User logged out successfully",
      token: null // You can send null or an expired token to indicate logout
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: error.message
    });
  }
}


export function deleteUser(req,res){
  Student.deleteOne({name : req.body.name}).then(
    ()=>{
      res.json(
        {
          message : "Requested user deleted successfully"
        }
      )
    }
  )
}
export function isadmin(req){
  if(req.user?.type == "admin"){
    return true
  }
  return false
}

export function isCustomer(req){
  if(req.user?.type == "customer"){
    return true
  }
  return false
}


import User from "../models/user.js";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create User
export async function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type === "admin") {
    if (req.user == null) {
      return res.status(401).json({
        message: "Please login as administrator to create admin accounts"
      });
    }

    if (req.user.type !== "admin") {
      return res.status(403).json({
        message: "Please login as administrator to create admin accounts"
      });
    }
  }

  try {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);  // Use async bcrypt.hash
    const user = new User(newUserData);

    await user.save();
    return res.status(201).json({
      message: "User created successfully"
      
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "User not created",
      error: error.message
    });
  }
}

// Login User
export async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);  // Use async bcrypt.compare
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isBlocked: user.isBlocked,
          type: user.type,
          profilePicture: user.profilePicture,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        message: "Successfully logged in",
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
          profilePicture: user.profilePicture,
          email: user.email,
        },
      });
    } else {
      return res.status(400).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// Get Current User
export function getUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user logged in" });
  }

  // Exclude sensitive data like password
  const { password, ...safeUserData } = req.user.toObject ? req.user.toObject() : req.user;
  return res.status(200).json(safeUserData);
}

// Get All Users
export async function getAllUsers(req, res) {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }

  try {
    const users = await User.find();
    const sanitizedUsers = users.map((user) => {
      const { password, ...safeUserData } = user.toObject();
      return safeUserData;
    });
    return res.status(200).json({ success: true, data: sanitizedUsers });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
}

// DELETE User function
export async function deleteUser(req, res) {
  const userId = req.params.id;

  // Check if the user is an admin before proceeding with the deletion
  if (!isAdmin(req)) {
    return res.status(403).json({ message: "Forbidden: Admin access required to delete users" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export function isAdmin(req) {
  if (req.user == null || req.user.type !== "admin") {
    return false;
  }
  return true;
}

export function isCustomer(req) {
  if (req.user == null || req.user.type !== "customer") {
    return false;
  }
  return true;
}
export async function googleLogin(req,res){
  console.log(req.body)
  const token = req.body.token
  //'https://www.googleapis.com/oauth2/v3/userinfo'
  try{
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const email = response.data.email
    //check if user exists
    const usersList = await User.find({email: email})
    if(usersList.length >0){
      const user = usersList[0]
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
        token: token,
        user : {
          firstName : user.firstName,
          lastName : user.lastName,
          type : user.type,
          profilePicture : user.profilePicture,
          email : user.email
        }
      })
    }else{
      //create new user
      const newUserData = {
        email: email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        type: "customer",
        password: "ffffff",
        profilePicture: response.data.picture
      }
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

  }catch(e){
    res.json({
      message: "Google login failed"
    })
  }


}





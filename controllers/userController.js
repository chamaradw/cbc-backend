import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios"; 

dotenv.config();
export function isAdmin(req){
  if(req.user==null){
    return false
  }

  if(req.user.type != "admin"){
    return false
  }

  return true
}

export function isCustomer(req){
  if(req.user==null){
    return false
  }

  if(req.user.type != "customer"){
    return false
  }

  return true
}

// Create User
export async function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type === "admin") {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({
        message: "Only admins can create admin accounts",
      });
    }
  }

  try {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
    const user = new User(newUserData);
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "User not created", error: error.message });
  }
}

// Login User
      export async function loginUser(req, res) {
        try {
          const user = await User.findOne({ email: req.body.email });
      
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      
          if (isPasswordCorrect) {
            const accessToken = jwt.sign(
              {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isBlocked: user.isBlocked,
                type: user.type,
                profilePicture: user.profilePicture,
              },
              process.env.SECRET,
              { expiresIn: "15m" } // Shorten expiration for security
            );
      
            const refreshToken = jwt.sign(
              { email: user.email },
              process.env.SECRET,
              { expiresIn: "7d" } // Lasts longer than the access token
            );
      
            return res.json({
              message: "Successfully logged in",
              accessToken,
              refreshToken, // Send refresh token
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

  const { password, ...safeUserData } = req.user.toObject();
  return res.status(200).json(safeUserData);
}

// Get All Users (Admin Only)
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
    return res.status(500).json({ success: false, message: "Error retrieving users", error: error.message });
  }
}

// DELETE User (Admin Only)
export async function deleteUser(req, res) {
  const userId = req.params.id;

  if (!req.user || req.user.type !== "admin") {
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

// Google Login
export async function googleLogin(req, res) {
  console.log(req.body);
  const token = req.body.token;

  try {
    const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const email = response.data.email;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      const authToken = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isBlocked: user.isBlocked,
          type: user.type,
          profilePicture: user.profilePicture,
        },
        process.env.SECRET,
        { expiresIn: "8h" }
      );

      return res.json({
        message: "User logged in",
        token: authToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
          profilePicture: user.profilePicture,
          email: user.email,
        },
      });
    } else {
      // Create new user
      const newUser = new User({
        email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        type: "customer",
        password: "ffffff",
        profilePicture: response.data.picture,
      });

      await newUser.save();
      return res.json({ message: "User created" });
    }
  } catch (error) {
    console.error("Google login failed:", error);
    return res.status(500).json({ message: "Google login failed" });
  }
}

// Get User Profile
export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: user.name, address: user.address, phone: user.phone });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}









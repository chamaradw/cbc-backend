import User from "../models/user.js";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import axios from "axios"; // ✅ Added missing import
=======
import axios from "axios"; 
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163

dotenv.config();

// Create User
export async function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type === "admin") {
<<<<<<< HEAD
    if (req.user == null) {
      return res.status(401).json({
        message: "Please login as administrator to create admin accounts"
=======
<<<<<<< HEAD
    if (!req.user) {
      return res.status(401).json({
        message: "Please login as administrator to create admin accounts",
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
      });
    }

    if (req.user.type !== "admin") {
<<<<<<< HEAD
      return res.status(403).json({
        message: "Please login as administrator to create admin accounts"
=======
      return res.status(403).json({
        message: "Please login as administrator to create admin accounts",
=======
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({
        message: "Only admins can create admin accounts",
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
      });
    }
  }

  try {
<<<<<<< HEAD
    newUserData.password = await bcrypt.hash(newUserData.password, 10);  // Use async bcrypt.hash
=======
<<<<<<< HEAD
    newUserData.password = await bcrypt.hash(newUserData.password, 10); // ✅ Ensure bcrypt.hash is awaited
=======
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
    const user = new User(newUserData);

    await user.save();
<<<<<<< HEAD
    return res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "User not created",
      error: error.message
    });
=======
<<<<<<< HEAD
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "User not created",
      error: error.message,
    });
=======
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "User not created", error: error.message });
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
  }
}

// Login User
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
export async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< HEAD
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);  // Use async bcrypt.compare
=======
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    ); // ✅ Ensure bcrypt.compare is awaited

>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
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
<<<<<<< HEAD
        process.env.SECRET,
        { expiresIn: '1h' }
=======
        process.env.SECRET, // ✅ Fixed secret variable name
        { expiresIn: "1h" }
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
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
<<<<<<< HEAD
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
=======
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
=======
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
      
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163

// Get Current User
export function getUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user logged in" });
  }

<<<<<<< HEAD
  // Exclude sensitive data like password
  const { password, ...safeUserData } = req.user.toObject ? req.user.toObject() : req.user;
=======
<<<<<<< HEAD
  // ✅ Use `.toObject()` if available, to exclude sensitive data
  const { password, ...safeUserData } = req.user.toObject
    ? req.user.toObject()
    : req.user;

=======
  const { password, ...safeUserData } = req.user.toObject();
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
  return res.status(200).json(safeUserData);
}

// Get All Users
export async function getAllUsers(req, res) {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({
      message: "Forbidden: Admin access required",
    });
  }

  try {
    const users = await User.find();
    const sanitizedUsers = users.map((user) => {
      const { password, ...safeUserData } = user.toObject();
      return safeUserData;
    });
<<<<<<< HEAD
=======

<<<<<<< HEAD
    return res.status(200).json({
      success: true,
      data: sanitizedUsers,
    });
=======
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
    return res.status(200).json({ success: true, data: sanitizedUsers });
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
}

<<<<<<< HEAD
// DELETE User function
=======
<<<<<<< HEAD
// DELETE User function (Admin Only)
export async function deleteUser(req, res) {
  const userId = req.params.id;

  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Forbidden: Admin access required to delete users",
    });
=======
// DELETE User (Admin Only)
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
export async function deleteUser(req, res) {
  const userId = req.params.id;

  // Check if the user is an admin before proceeding with the deletion
  if (!isAdmin(req)) {
    return res.status(403).json({ message: "Forbidden: Admin access required to delete users" });
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

<<<<<<< HEAD
export function isAdmin(req) {
  if (req.user == null || req.user.type !== "admin") {
    return false;
=======
<<<<<<< HEAD
// Helper functions
export function isAdmin(req) {
  return req.user && req.user.type === "admin";
}

export function isCustomer(req) {
  return req.user && req.user.type === "customer";
}

// Google Login
export async function googleLogin(req, res) {
  console.log(req.body);
  const token = req.body.token;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
=======
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
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c

    const email = response.data.email;

    // Check if user exists
<<<<<<< HEAD
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
=======
    let user = await User.findOne({ email });

    if (user) {
      const authToken = jwt.sign(
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isBlocked: user.isBlocked,
          type: user.type,
          profilePicture: user.profilePicture,
        },
<<<<<<< HEAD
        process.env.SECRET // ✅ Fixed secret variable name
=======
        process.env.SECRET,
        { expiresIn: "8h" }
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
      );

      return res.json({
        message: "User logged in",
<<<<<<< HEAD
        token,
=======
        token: authToken,
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
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

<<<<<<< HEAD
      await newUser.save(); // ✅ Added `await` to properly save user

      return res.json({ message: "User created" });
    }
  } catch (error) {
    console.error("Google login failed:", error);
    return res.status(500).json({ message: "Google login failed" });
=======
      await newUser.save();
      return res.json({ message: "User created" });
    }
  } catch (error) {
    console.error("Google login failed:", error);
    return res.status(500).json({ message: "Google login failed" });
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
  }
  return true;
}

<<<<<<< HEAD
export function isCustomer(req) {
  if (req.user == null || req.user.type !== "customer") {
    return false;
=======
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
>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163
  }
  return true;
}

// Get User Profile
export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< HEAD
    res.json({ name: user.name, address: user.address, phone: user.phone1 }); // ✅ Fixed `phone1` to `phone`
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
=======



<<<<<<< HEAD
=======


>>>>>>> be1cc26895019768ff9f21786b5de0712bd82c7c
>>>>>>> 3e88de9cea576833c583d51f8b2f34dfe05ba163

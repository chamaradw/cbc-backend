import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios"; 
import LoginLog from "../models/LoginLog.js";

dotenv.config();

// Create User
export async function createUser(req, res) {
  try {
    const { email, firstName, lastName, password, address, deliveryAddress, phone1, phone2, profilePicture, type } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      address: address || "",
      deliveryAddress: deliveryAddress || "",
      phone1: phone1 || "",
      phone2: phone2 || "",
      profilePicture: profilePicture || "",
      type: type || "customer",
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "User not created", error: error.message });
  }
}

// Login User
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      await LoginLog.create({ email, provider: "Email", status: "Failure" });
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      await LoginLog.create({ email, provider: "Email", status: "Failure" });
      return res.status(400).json({ message: "Wrong password" });
    }

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
      { expiresIn: "1h" }
    );

    // ✅ Log successful login attempt
    await LoginLog.create({ email, provider: "Email", status: "Success" });

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

  // ✅ Call `.toObject()` to remove Mongoose metadata
  const userData = req.user.toObject ? req.user.toObject() : req.user;

  // ✅ Exclude sensitive fields
  const { password, ...safeUserData } = userData;

  return res.status(200).json(safeUserData);
}


// Get All Users (Admin Only)
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

    return res.status(200).json({
      success: true,
      data: sanitizedUsers,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
}

// DELETE User function (Admin Only)
export async function deleteUser(req, res) {
  const userId = req.params.id;

  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Forbidden: Admin access required to delete users",
    });
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

    const email = response.data.email;

    // Check if user exists
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isBlocked: user.isBlocked,
          type: user.type,
          profilePicture: user.profilePicture,
        },
        process.env.SECRET // ✅ Fixed secret variable name
      );

      return res.json({
        message: "User logged in",
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
      // Create new user
      const newUser = new User({
        email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        type: "customer",
        password: "ffffff",
        profilePicture: response.data.picture,
      });

      await newUser.save(); //  Added `await` to properly save user

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

    res.json({ name: user.name, address: user.address, phone: user.phone1 }); // ✅ Fixed `phone1` to `phone`
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Update User by Email
export async function updateUser(req, res) {
  try {
    const userEmail = req.params.email; // Identify user by email
    const updates = req.body;

    // Find User by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure that only the logged-in user or an admin can update the profile
    if (req.user.email !== userEmail && req.user.type !== "admin") {
      return res.status(403).json({ message: "Forbidden: You can only update your own profile" });
    }

    // Remove fields that should not be updated by anyone
    const restrictedFields = ["email", "password", "type"];
    restrictedFields.forEach(field => delete updates[field]);

    // Only allow admins to update the isBlocked field
    if (req.user.type !== "admin") {
      delete updates.isBlocked;
    }

    // Handle password update separately
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update fullName manually if firstName or lastName is changed
    updates.fullName = `${updates.firstName || user.firstName} ${updates.lastName || user.lastName}`.trim();

    // Update the user with the remaining allowed fields
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


// ✅ Get User Distribution Statistics
export async function getUserStats(req, res) {
  console.log("✅ getUserStats function was called!");

  try {
    // Ensure only admins can access stats
    if (!req.user || req.user.type !== "admin") {
      console.log("❌ Forbidden: Admin access required");
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    // Count users by type
    const adminCount = await User.countDocuments({ type: "admin" });
    const customerCount = await User.countDocuments({ type: "customer" });
    const guestCount = await User.countDocuments({ type: "guest" });

    console.log(`✅ Admins: ${adminCount}, Customers: ${customerCount}, Guests: ${guestCount}`);

    res.status(200).json({
      admins: adminCount,
      customers: customerCount,
      guests: guestCount,
    });
  } catch (error) {
    console.error("❌ Error fetching user stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

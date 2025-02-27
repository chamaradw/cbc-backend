import mongoose from "mongoose";
import User from "./models/user.js"; // Adjust path to your user model

const updateAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const result = await User.updateOne(
    { email: "chamaradw@gmail.com.com" },
    { $set: { isAdmin: true } }
  );

  console.log("Update Result:", result);
  mongoose.connection.close();
};

updateAdmin();

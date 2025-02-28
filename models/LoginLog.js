import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    provider: { type: String, required: true, enum: ["Email", "Google"] },
    status: { type: String, required: true, enum: ["Success", "Failure"] },
  },
  { timestamps: true }
);

const LoginLog = mongoose.model("LoginLog", loginLogSchema);
export default LoginLog;

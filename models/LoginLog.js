import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    provider: { type: String, required: true, enum: ["Email", "Google"] },
    status: { type: String, required: true, enum: ["Success", "Failure"] },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const LoginLog = mongoose.model("LoginLog", loginLogSchema);

export default LoginLog;

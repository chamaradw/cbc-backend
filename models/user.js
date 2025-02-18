import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  type: { type: String, default: "customer" },
  fullName: { type: String }, // No need to be required since it's auto-generated
  address: { type: String },
  deliveryAddress: { type: String },
  phone1: { type: String },
  phone2: { type: String },
  profilePicture: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1731770840~exp=1731774440~hmac=0f8ac074c2321289f63858728e073c0d5946ea6cb542c3b259a88e367a7dde25&w=740",
  },
}, { timestamps: true }); // ✅ Added timestamps for createdAt & updatedAt

// Pre-save hook to generate full name
userSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();
  next();
});

// Pre-update hook to update full name when firstName or lastName changes
userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.firstName || update.lastName) {
    update.fullName = `${update.firstName || this.get("firstName")} ${update.lastName || this.get("lastName")}`.trim();
  }
  next();
});

const User = mongoose.model("User", userSchema); 

export default User;

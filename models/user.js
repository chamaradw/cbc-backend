import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  isBlocked : {
    type : Boolean,
    default : false
  },
  type : {
    type : String,
    default : "customer"
  },
  profilePicture : {
    type : String,
    default : "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1731770840~exp=1731774440~hmac=0f8ac074c2321289f63858728e073c0d5946ea6cb542c3b259a88e367a7dde25&w=740"
  }
})

const User = mongoose.model("users",userSchema)

export default User;
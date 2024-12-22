import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderId : {
    type : String,
    required : true,
    unique : true
  },
  email : {
    type : String,
    required : true
  },
  orderedItems : [//orderedItems array
    {
      name : {
        type : String,
        required : true
      },
      price : {
        type : Number,
        required : true
      },
      quantity : {
        type : Number,
        required : true
      },
      image : {
        type : String,
        required : true
      }
    }
  ],
  date : {
    type : Date,
    default : Date.now
  },
  paymentId:{
    type : String
  },
  status : {
    type : String,
    default : "Processing"
  },
  notes : {
    type : String
  },
  name : {          //name of the customer
    type : String,
    required : true
  },
  address : {       //address of the customer
    type : String,
    required : true
  },
  phone : {         //phone number of the customer
    type : String,
    required : true
  }
})

const Order = mongoose.model("orders",orderSchema);

export default Order;
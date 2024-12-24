import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
{
  orderId : {type : String,required : true,unique : true},
  email : {type : String,required : true},
  orderedItems : [//orderedItems array
    { productID : {type : String,required : true},
      productName : {type : String,required : false},
      price : {type : Number,required : false},
      quantity : {type : Number,required : true},
      image : {type : String,required : false}
    }
  ],
  date : {type : Date,default : Date.now},
  paymentId:{type : String},
  status : {type : String,default : "Processing"},
  notes : {type : String},                        //notes of the customer
  name : {type : String,required : true},         //name of the customer
  address : {type : String,required : true },     //address of the customer
  phone : {type : String,required : true}         //phone number of the customer 
})

const Order = mongoose.model("orders",orderSchema); //

export default Order;
import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
{
  orderId : {type : String,required : true,unique : true},
  email : {type : String,required : true},
  orderedItems : [//orderedItems array
    {   
      productId : {type : String},
      productName : {type : String},
      altNames : [{type : String}],
      images : [{type : String}],
      price : {type : Number,required : false},
      lastPrice : {type : Number,required : false},
      stock : {type : Number,required : false},
      description : {type : String,required : false}
    }
  ],
    custName : {type : String,required : true},         //name of the customer
    custAddress : {type : String,required : true },     //address of the customer
    paymentId:{type : String},
    date : {type : Date,default : Date.now},
    status : {type : String,default : "Processing"},
    notes : {type : String},                        //notes of the customer
    phone : {type : String,required : true}         //phone number of the customer  
})

const Order = mongoose.model("orders",orderSchema); //

export default Order;
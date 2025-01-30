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
      quantity : {type : Number,required : true},
      lastPrice : {type : Number,required : false},
      stock : {type : Number,required : false},
      description : {type : String,required : false}
    }
  ],
    custName : {type : String,required : true},       
    custAddress : {type : String,required : true },   
    paymentId:{type : String},
    date : {type : Date,default : Date.now},
    status : {type : String,default : "Processing"},
    notes : {type : String},                        
    phone : {type : String,required : true}         
})

const Order = mongoose.model("orders",orderSchema); 

export default Order;
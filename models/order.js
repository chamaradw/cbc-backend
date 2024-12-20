import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    orderId: {type: String,required: true, unique: true},
    orderedItems: [{
            product: {type: mongoose.Schema.Types.ObjectId,ref: "products", required: true},
            quantity: {type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            },
            date : {
                type: Date,
                default: Date.now
            },
            paymentID : {
                type: String,
                //required: true
            },
            status  : {
                type: String,
                default: "Processing"
            },
            name: {
                type: String,
                required: true  
            },
            address: {
                type: String,
                required: true
            },
           
            phone: {
                type: String,
                required: true
            }

        }
    ],
    //totalAmount: {
     //   type: Number,
    //},

})

const order = mongoose.model("orders", orderSchema);


export default order
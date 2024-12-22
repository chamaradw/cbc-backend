import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res){
  
  if(!isCustomer){
    res.json({
      message: "Please login as customer to create orders"
    })
  }

  try{
    const latestOrder = await Order.find().sort({date : -1}).limit(1)

    let orderId

    if(latestOrder.length == 0){
      orderId = "CBC0001"
    }else{
      const currentOrderId = latestOrder[0].orderId

      const numberString =  currentOrderId.replace("CBC","")

      const number = parseInt(numberString)

      const newNumber = (number + 1).toString().padStart(4, "0");

      orderId = "CBC" + newNumber
    }

    const newOrderData = req.body



    const newProductArray = []
    
    for(let i=0;i<newOrderData.orderedItems.length;i++){

        const product = await Product.findOne({
          productId : newOrderData.orderedItems[i].productId
        })


        if(product == null){
          res.json({
            message: "Product with id "+newOrderData.orderedItems[i].productId+" not found"
          })
          return
        }

        newProductArray[i] = {
          productName : product.productName,
          price : product.price,
          quantity : newOrderData.orderedItems[i].quantity,
          image : product.images[0],
          address: newOrderData.orderedItems[i].address,
          phoneNumber: newOrderData.orderedItems[i].phoneNumber,
          paymentId: newOrderData.orderedItems[i].paymentId,
          notes: newOrderData.orderedItems[i].notes


        }

    
    }
    console.log(newProductArray) 

    newOrderData.orderedItems = newProductArray
 

    newOrderData.orderId = orderId
    newOrderData.email = req.user.email

    const order = new Order(newOrderData)

    await order.save()

    res.json({
      message: "Order created"
    })



  }catch(error){
    res.status(500).json({
      message: error.message
    })
  }

}

export async function getOrders(req,res){
  try{
    const orders = await Order.find({email : req.user.email})

    res.json(orders)

  }catch(error){
    res.status(500).json({
      message: error.message
    })
  }
}


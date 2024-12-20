import Order from "../models/order.js";
import { isCustomer } from "../controllers/userController.js"; // import isCustomer function


export async function createOrder(req,res){//check whether customer or not
  
  if(!isCustomer){
    res.json({
      message: "Please login as customer to create orders"
    })
  }
//fetch latest product ID
  try{
    const latestOrder = await Order.find().sort({date : -1}).limit(1)

    let orderId // define variable for assign order ID

    //assigne fetched order ID in to a variable

    if(latestOrder && latestOrder.length == 0){

      orderId = "CBC1001"     //asgin customized order ID

    }else{
      const currentOrderId = latestOrder[0].orderId // assign current order ID as lst order ID

      const numberString =  currentOrderId.replace("CBC","") // extract number from CBC from order ID by seperating srting

      const number = parseInt(numberString) // convert string to number

      const newNumber = (number + 1).toString().padStart(4, "0"); // incrament number by 1 add leading zero

      orderId = "CBC" + newNumber //concatinated CBC with incremented number
    }

    const newOrderData = req.body //get order data from request body

    const newProductArray = []   //define product array to validation of product ID

    for (let i = 0; i < newOrderData.ordereditems.length; i++) 
      {
      //console.log(newOrderData.ordereditems[i])
    
      const product = await product.findone({
        productId: newOrderData.ordereditems[i].productId
      })

      console.log(product)  

      if (!product == null) {
        res.json({
          message: "Product with ID " + newOrderData.ordereditems[i].productId + " not found"
        })
     return
    }

    newProductArray[i]={
      //productId: product.productId,
      name : product.name,
      price : product.price,
      quantity : newOrderData.ordereditems[i].quantity,
      ImageUrl : product.images[0]
    }
      
    }

    console.log(newProductArray)

    newOrderData.ordereditems = newProductArray


    newOrderData.orderId = orderId //assgine newly created order ID
    newOrderData.email = req.user.email

    const order = new Order(newOrderData)

    await order.save() //save order

    res.json({
      message: "Order created"
    })
    //console.log(order)
  }
  catch(error){
    res.status(500).json({
      message: error.message,
      
    })
  }

}



export async function getAllOrders(req,res){

  try{  
    const orders = await Order.find({email : req.user.email})
    res.json({orders})
    }
  catch(error){res.status(500).json({message: error.message,})}
}
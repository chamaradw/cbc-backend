import Order from "../models/order.js"
import { isCustomer } from "../user/permission.js"; // import isCustomer function


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
    if(latestOrder.length == 0){
      orderId = "CBC1001"     //asgin customized order ID
    }else{
      const currentOrderId = latestOrder[0].orderId // assign current order ID as lst order ID

      const numberString =  currentOrderId.replace("CBC","") // extract number from CBC from order ID by seperating srting

      const number = parseInt(numberString) // convert string to number

      const newNumber = (number + 1).toString().padStart(4, "0"); // incrament number by 1 add leading zero

      orderId = "CBC" + newNumber //concatinated CBC with incremented number
    }

    const newOrderData = req.body
    newOrderData.orderId = orderId //assgine newly created order ID
    newOrderData.email = req.user.email

    const order = new Order(newOrderData)

    await order.save() //save order

    res.json({
      message: "Order created"
    })



  }catch(error){
    res.status(500).json({
      message: error.message
    })
  }

}

import Order from "../models/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res){
  
  if(!isCustomer){
    res.json({
      message: "Please login as customer to create orders"
    })
  }

  try{
    const latestOrder = await Order.find().sort({date : -1}).limit(1)//get latest order and sort in decending order

    let orderId //order id

    if(latestOrder.length == 0){orderId = "CBC1001"}
    else
    {
      const currentOrderId = latestOrder[0].orderId //get current order id

      const numberString =  currentOrderId.replace("CBC","") // removing CBC from order id

      const number = parseInt(numberString)  // passing number string to integer

      const newNumber = (number + 1).toString().padStart(4, "0"); // increamnt order id by 1 and padding with 0

      orderId = "CBC" + newNumber // create new order id
    }

    const newOrderData = req.body
    newOrderData.orderId = orderId
    newOrderData.email = req.user.email   
    const order = new Order(newOrderData)
    await order.save()



    // const newProductArray = []
    
    // for(let i=0;i<newOrderData.orderedItems.length;i++){

    //     const product = await Product.findOne({
    //       productId : newOrderData.orderedItems[i].productId
    //     })


    //     if(product == null){
    //       res.json({
    //         message: "Product with id "+newOrderData.orderedItems[i].productId+" not found"
    //       })
    //       return
    //     }

    //     newProductArray[i] = {
    //       productName : product.productName,
    //       price : product.price,
    //       quantity : newOrderData.orderedItems[i].quantity,
    //       image : product.images[0],
    //       address: newOrderData.orderedItems[i].address,
    //       phoneNumber: newOrderData.orderedItems[i].phoneNumber,
    //       paymentId: newOrderData.orderedItems[i].paymentId,
    //       notes: newOrderData.orderedItems[i].notes


    //     }

    
    // }
    // console.log(newProductArray) 

    //newOrderData.orderedItems = newProductArray
 

    //newOrderData.orderId = orderId
    //newOrderData.email = req.user.email

    res.json({
      message: "Order created"
    })



  }catch(error){
    res.status(500).json({
      message: error.message
      
    })
    console.log(error)  
  }

}

export async function getOrders(req,res){
  try{
    const orders = await Order.find({email : req.user.email})

    res.json(orders)

  }catch(error){
    res.status(500).json({
      message: error
    })
  }
}


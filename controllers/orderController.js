import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res)
{
  if(!isCustomer)
    {res.json({message: "Please login as customer to create orders"})}
    try{
        const latestOrder = await Order.find().sort({date : -1}).limit(1)//get latest order and sort in decending order
        let orderId //order id
        if(latestOrder.length == 0){orderId = "CBC1001"}
        else
        {
          const currentOrderId = latestOrder[0].orderId;
          const number = parseInt(currentOrderId.replace("CBC", ""));
          orderId = "CBC" + (number + 1).toString().padStart(4, "0");
        }
        const newOrderData = req.body;
        if (!newOrderData.orderedItems || newOrderData.orderedItems.length === 0) {
          return res.status(400).json({ message: "No ordered items provided" });
        }
      const newProductArray = []  
      let missingProducts = [];

      for(let i=0;i<newOrderData.orderedItems.length;i++)
       {
        const productId = newOrderData.orderedItems[i].productId;
        const product=  await Product.findOne({productId:newOrderData.orderedItems[i].productId,})
        console.log(product)
        if (!product) 
          {
            missingProducts.push(productId);
          }
        if(product == null)
          {
            res.json({message: "Product with ids " + newOrderData.orderedItems[i].productId +" are not found"})
            return 
          }
        newProductArray[i] =
        {
          productName : product.productName,
          altNames : product.altNames,
          quantity : newOrderData.orderedItems[i].quantity,
          price : product.price,
          lastPrice : product.lastPrice,
          stock : product.stock,
          description : product.description,
          images : product.images[0],
          custName : newOrderData.custName,
          custAddress : newOrderData.custAddress,
          paymentId : newOrderData.paymentId,
          notes : newOrderData.notes,
          status : newOrderData.status,
     
        }
      }
      console.log(newProductArray) 
      newOrderData.orderedItems = newProductArray
      newOrderData.orderId = orderId
      newOrderData.email = req.user.email 

      const order = new Order(newOrderData)
      await order.save()
      res.json({message: "Order created"

    })
    }catch(error){res.status(500).json({message: error.message })
      console.log(error)  //send error to CONSOLE
  }
}
//End of create order



export async function getOrders(req, res) {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ email: req.user.email });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
}
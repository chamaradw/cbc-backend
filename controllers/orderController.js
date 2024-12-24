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
          // const currentOrderId = latestOrder[0].orderId //get current order id
          // const numberString =  currentOrderId.replace("CBC","") // removing CBC from order id
          // const number = parseInt(numberString)  // passing number string to integer
          // const newNumber = (number + 1).toString().padStart(4, "0"); // increamnt order id by 1 and padding with 0
          // orderId = "CBC" + newNumber // create new order id

          const currentOrderId = latestOrder[0].orderId;
          const number = parseInt(currentOrderId.replace("CBC", ""));
          orderId = "CBC" + (number + 1).toString().padStart(4, "0");
        }
        const newOrderData = req.body;
        if (!newOrderData.orderedItems || newOrderData.orderedItems.length === 0) {
          return res.status(400).json({ message: "No ordered items provided" });
        }
    
      //   const products = await Promise.all(
      //     newOrderData.orderedItems.map(async (item) => {
      //       const product = await Product.findOne({ productId: item.productId });
      //       if (!product) {
      //         throw new Error(`Product with id ${item.productId} not found`);
      //       }
      //       return {
      //         productID: product.productId,
      //         name: product.productName,
      //         price: product.price,
      //         quantity: item.quantity,
      //         address: item.address,
      //         phoneNumber: item.phoneNumber,
      //         paymentId: item.paymentId,
      //         notes: item.notes,
      //         phone: item.phone,
      //         name: item.name,
      //         image: item.image,
      //       };
      //     })
      //   );
    
      //   newOrderData.orderId = orderId;
      //   newOrderData.email = req.user.email;
      //   newOrderData.products = products;
    
      //   const order = new Order(newOrderData);
      //   await order.save();
    
      //   res.json({ message: "Order created" });
      // } catch (error) {
      //   console.error("Error creating order:", error);
      //   res.status(500).json({ message: error.message });
          
     // const newOrderData = req.body
      const newProductArray = []
      for(let i=0;i<newOrderData.orderedItems.length;i++)
      {
        const product =  await Product.findOne({productId:newOrderData.orderedItems[i].productId,})
        if(Product == null)
          {
            res.json({message: "Product with id " + newOrderData.orderedItems[i].productId+" not found"})
            return
          }
        newProductArray[i] = 
        {
         
          name : Product.productName,
          price : Product.price,
          //images : Product.images[0],
          quantity : newOrderData.orderedItems[i].quantity,
          address: newOrderData.orderedItems[i].address,
          phoneNumber: newOrderData.orderedItems[i].phoneNumber,
          paymentId: newOrderData.orderedItems[i].paymentId,
          notes: newOrderData.orderedItems[i].notes,
          phone: newOrderData.orderedItems[i].phone,
          name: newOrderData.orderedItems[i].name,
          image: newOrderData.orderedItems[i].image,
        }
      }
      console.log(newProductArray) 
      newOrderData.orderId = orderId
      newOrderData.email = req.user.email   
      const order = new Order(newOrderData)
      await order.save()
      res.json({
      message: "Order created"
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
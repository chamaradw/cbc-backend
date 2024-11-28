import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductByName } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/',getProduct);



productRouter.get("/filter", (req,res)=>{
  res.json({
    message : "This is product Filtering area"
  })
})

productRouter.get("/:name",getProductByName)


productRouter.post('/',createProduct);
productRouter.delete("/:name",deleteProduct);



export default productRouter;
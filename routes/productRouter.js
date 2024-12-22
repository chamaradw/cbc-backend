import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.put("/",updateProduct)
productRouter.delete("/",deleteProduct)

export default productRouter; 
import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct, getProductsById} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.get("/:productId",getProductsById)
productRouter.put("/",updateProduct)
productRouter.delete("/",deleteProduct)

export default productRouter; 
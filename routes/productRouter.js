import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct, getProductsById} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.get("/:productId",getProductsById)
productRouter.put("/:productId",updateProduct)
productRouter.delete("/:productId",deleteProduct)

export default productRouter; 
import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct, getProductsById, searchProducts} from '../controllers/productController.js';
import { getProductsByCategory } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.get("/search/:query",searchProducts)
productRouter.get("/:productId",getProductsById)
productRouter.put("/:productId",updateProduct)
productRouter.delete("/:productId",deleteProduct)
productRouter.get("/category/:category",getProductsByCategory)


export default productRouter; 
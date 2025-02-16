import { Router } from "express";
import {addToWishlist,removeFromWishlist,getWishlist,} from "../controllers/wishlistController.js";

const router = Router();
router.get("/:email", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);


export default router;

import { Router } from "express";
import {addToWishlist,removeFromWishlist,getWishlist,} from "../controllers/wishlistController.js";

const router = Router();

router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.get("/:email", getWishlist);

export default router;

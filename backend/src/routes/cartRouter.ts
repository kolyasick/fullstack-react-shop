import express from "express";
import {
  getCart,
  addProductToCart,
  removeFromCart,
} from "../controllers/cartController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:cartId/products/add", addProductToCart);
router.delete(
  "/:cartId/products/:productId/remove",

  removeFromCart
);

export default router;

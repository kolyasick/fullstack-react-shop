import express from "express";
import {
  getCart,
  addProductToCart,
  removeFromCart,
} from "../controllers/cartController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:userId", authenticate, getCart);
router.post("/:cartId/products/add", authenticate, addProductToCart);
router.delete(
  "/:cartId/products/:productId/remove",
  authenticate,
  removeFromCart
);

export default router;

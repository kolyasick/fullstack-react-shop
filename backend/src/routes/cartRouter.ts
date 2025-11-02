import express from "express";
import { getCart, initializeCart } from "../controllers/cartController";

const router = express.Router();

router.get("/:userId/", getCart);
router.post("/initalize", initializeCart);

export default router;

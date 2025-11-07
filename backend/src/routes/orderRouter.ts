import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/", createOrder);

export default router;

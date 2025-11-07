import express from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import productRouter from "./productRouter";
import cartRouter from "./cartRouter";
import orderRouter from "./orderRouter";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/", userRouter);
router.use("/products", productRouter);
router.use("/cart", authenticate, cartRouter);
router.use("/order", authenticate, orderRouter);

export default router;

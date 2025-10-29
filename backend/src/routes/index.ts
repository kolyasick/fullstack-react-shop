import express from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import productRouter from "./productRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/", userRouter);
router.use("/products", productRouter);

export default router;

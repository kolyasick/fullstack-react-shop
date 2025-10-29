import express from "express";
import { getProducts, getBrands } from "../controllers/productController";
const router = express.Router();

router.get("/", getProducts);
router.get("/brands", getBrands);

export default router;

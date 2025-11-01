import express from "express";
import {
  getProducts,
  getBrands,
  getCategories,
} from "../controllers/productController";
const router = express.Router();

router.get("/", getProducts);
router.get("/brands", getBrands);
router.get("/categories", getCategories);

export default router;

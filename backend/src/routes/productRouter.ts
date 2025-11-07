import express from "express";
import {
  getProducts,
  getBrands,
  getCategories,
  getProductById,
} from "../controllers/productController";
const router = express.Router();

router.get("/", getProducts);
router.get("/find/:id", getProductById);
router.get("/brands", getBrands);
router.get("/categories", getCategories);

export default router;

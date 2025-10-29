import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { getProfile } from "../controllers/userController";

const router = express.Router();

router.get("/profile", authenticate, getProfile);

export default router;

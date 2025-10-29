import express from "express";
import { register, login, refresh, logout } from "../controllers/authController";
const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;

// src/routes/auth.routes.js
import { Router } from "express";
import { checkSession, login, logout, register } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/session", checkSession);
router.post("/logout", logout);

export default router;

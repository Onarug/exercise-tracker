import express from "express";
import { register,login, logout, whoAmI } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { regsiterSchema,loginSchema } from "../validators/authValidator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register",validateRequest(regsiterSchema), register);
router.post("/login",validateRequest(loginSchema) ,login);
router.post("/logout", logout)
router.get('/me',authMiddleware,whoAmI)

export default router
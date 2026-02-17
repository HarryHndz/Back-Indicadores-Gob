import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { validateLoginData } from "@/validations/auth.validation";
const router = Router()
const authController = new AuthController()
router.post('/login', validateLoginData, authController.login)
router.post('/logout', authController.logout)

export default router

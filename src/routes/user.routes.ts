import { UserController } from "@/controllers/user.controller";
import { Router } from "express";
import {
  validateUserData,
  validateUserUpdateData,
} from "@/validations/user.validation";

const router = Router();
const userContoller = new UserController();

router.get("/", userContoller.findAll);
router.get("/:id", userContoller.findById);
router.post("/register", validateUserData, userContoller.create);
router.put(
  "/:id",
  validateUserUpdateData,
  userContoller.update
);
router.delete("/:id", userContoller.delete);

export default router;

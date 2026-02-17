import { Router } from "express";
import { FormController } from "@/controllers/form.controller";
import {
  validateFormData,
} from "@/validations/form.validation";

const router = Router();
const formController = new FormController();

router.get("/", formController.findAll);
router.get("/:id", formController.findById);
router.post("/", validateFormData, formController.create);
router.put(
  "/:id",
  validateFormData,
  formController.update
);
router.delete("/:id", formController.delete);

export default router;

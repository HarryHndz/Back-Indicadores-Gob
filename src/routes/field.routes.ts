import { Router } from "express";
import { FieldController } from "@/controllers/field.controller";
import {
  validateFieldData,
} from "@/validations/field.validation";

const router = Router();
const fieldController = new FieldController();

router.get("/", fieldController.findAll);
router.get("/validation", fieldController.validateField);
router.get("/:id", fieldController.findById);
router.post("/", validateFieldData, fieldController.create);
router.put(
  "/:id",
  validateFieldData,
  fieldController.update
);
router.get("/form/:formId", fieldController.findAllByFormId);
router.get("/topic/:topicId", fieldController.findAllByTopicId);
router.delete("/:id", fieldController.delete);

export default router;

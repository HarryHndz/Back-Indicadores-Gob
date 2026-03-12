import { Router } from "express";
import { FormDataController } from "@/controllers/form.data.controller";

const router = Router();
const formDataController = new FormDataController();

router.get("/", formDataController.findAll);
router.get("/total", formDataController.totalRegister);
router.get("/:id", formDataController.findById);
router.post("/",formDataController.create)
router.put("/:id",formDataController.update)
router.delete("/:id",formDataController.delete)
router.get("/form/topic", formDataController.findAllByGuvernmentIdWithTopics);
router.get("/form/:id", formDataController.findAllByFormId);
router.get("/guvernment/:id", formDataController.findAllByGuvernment);
router.get("/topic/:topicId", formDataController.findAllByTopicId);
router.get("/field/form/:formId", formDataController.findFormByIdWithFields);
router.get("/field/topic/:topicId", formDataController.findFormByTopicIdWithFields);

export default router;
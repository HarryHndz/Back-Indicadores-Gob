import { Router } from "express";
import { FormDataController } from "@/controllers/form.data.controller";

const router = Router();
const formDataController = new FormDataController();

router.get("/", formDataController.findAll);
router.get("/:id", formDataController.findById);
router.get("/topic/:topicId", formDataController.findByTopicId);
router.post("/",formDataController.create)
router.put("/:id",formDataController.update)
router.delete("/:id",formDataController.delete)

export default router;
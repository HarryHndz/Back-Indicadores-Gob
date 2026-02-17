import { Router } from "express";
import { TopicController } from "@/controllers/topic.controller";
import {
  validateTopicData,
} from "@/validations/topic.validation";

const router = Router();
const topicController = new TopicController();

router.get("/", topicController.findAll);
router.get("/:id", topicController.findById);
router.post("/", validateTopicData, topicController.create);
router.put(
  "/:id",
  validateTopicData,
  topicController.update
);
router.delete("/:id", topicController.delete);

export default router;

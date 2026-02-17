import { Router } from "express";
import { TopicController } from "@/controllers/topic.controller";
const router = Router()
const topicController = new TopicController()
router.get('/',topicController.findAll)
router.get('/:id',topicController.findById)
router.post('/',topicController.create)
router.put('/:id',topicController.update)
router.delete('/:id',topicController.delete)
export default router
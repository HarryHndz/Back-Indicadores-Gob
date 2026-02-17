import { Router } from "express";
import { FieldController } from "@/controllers/field.controller";

const router = Router()
const fieldController = new FieldController()
router.get('/',fieldController.findAll)
router.get('/:id',fieldController.findById)
router.post('/',fieldController.create)
router.put('/:id',fieldController.update)
router.delete('/:id',fieldController.delete)
export default router
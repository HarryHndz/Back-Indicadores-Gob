import { Router } from "express";
import { FormController } from "@/controllers/form.controller";

const router = Router()
const formController = new FormController()
router.get('/',formController.findAll)
router.get('/:id',formController.findById)
router.post('/',formController.create)
router.put('/:id',formController.update)
router.delete('/:id',formController.delete)

export default router
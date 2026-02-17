import { Router } from "express";
import { GuvernmentEntityController } from "@/controllers/guvernment-entity.controller";

const router = Router()
const guvernmentEntityController = new GuvernmentEntityController()

router.get('/',guvernmentEntityController.findAll)
router.get('/:id',guvernmentEntityController.findById)
router.post('/',guvernmentEntityController.create)
router.put('/:id',guvernmentEntityController.update)
router.delete('/:id',guvernmentEntityController.delete)

export default router
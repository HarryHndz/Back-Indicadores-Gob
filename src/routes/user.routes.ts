import { UserController } from "@/controllers/user.controller";
import { Router } from "express";

const router = Router()
const userContoller = new UserController()

router.get('/',userContoller.findAll)
router.get('/:id',userContoller.findById)
router.post('/',userContoller.create)
router.put('/:id',userContoller.update)
router.delete('/:id',userContoller.delete)

export default router
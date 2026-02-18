import { RolController } from "@/controllers/rol.controller";
import { Router } from "express";

const router = Router()
const rolController = new RolController()

router.get("/", rolController.findAll);
router.get("/:id", rolController.findById);
router.post("/", rolController.create);
router.put("/:id", rolController.update);
router.delete("/:id", rolController.delete);

export default router
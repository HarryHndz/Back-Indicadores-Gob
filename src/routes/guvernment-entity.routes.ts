import { Router } from "express";
import { GuvernmentEntityController } from "@/controllers/guvernment-entity.controller";
import {
  validateGuvernmentEntityData,
} from "@/validations/guvernment-entity.validation";

const router = Router();
const guvernmentEntityController = new GuvernmentEntityController();

router.get("/", guvernmentEntityController.findAll);
router.get("/:id", guvernmentEntityController.findById);
router.post("/", validateGuvernmentEntityData, guvernmentEntityController.create);
router.put(
  "/:id",
  validateGuvernmentEntityData,
  guvernmentEntityController.update
);
router.delete("/:id", guvernmentEntityController.delete);

export default router;

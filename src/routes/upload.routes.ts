import {Router} from "express";
import { GuvernmentEntityController } from "@/controllers/guvernment-entity.controller";

const router = Router();
const guvernmentEntityController = new GuvernmentEntityController();
router.post("/guvernment-entity",guvernmentEntityController.saveImage);


export default router;


import { z } from "zod";
import { validateRequest } from "@/validations";


const baseRolBodySchema = z.object({
  name: z.string().min(1).max(150),
})
  

export const validateRolData = validateRequest(baseRolBodySchema);



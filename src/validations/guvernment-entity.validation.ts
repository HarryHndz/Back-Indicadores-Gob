import { z } from "zod";
import { validateRequest } from "@/validations";


const baseGuvernmentEntityBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    description: z.string().min(1).max(250),
    active: z.boolean().optional(),
  })

export const validateGuvernmentEntityData = validateRequest(baseGuvernmentEntityBodySchema);

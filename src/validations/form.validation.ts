import { z } from "zod";
import { validateRequest } from "@/validations";


const baseFormBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    active: z.boolean().optional(),
    id_gubernment: z.number().int().positive(),
  })


export const validateFormData = validateRequest(baseFormBodySchema);


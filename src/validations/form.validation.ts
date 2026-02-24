import { z } from "zod";
import { validateRequest } from "@/validations";


const baseFormBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    description: z.string().min(1).max(250),
    year_fiscal: z.string().min(1).max(50).nullable().optional(),
    update_period: z.string().min(1).max(50).nullable().optional(),
    id_guvernment: z.number().int().positive(),
  })


export const validateFormData = validateRequest(baseFormBodySchema);


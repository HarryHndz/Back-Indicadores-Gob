import { z } from "zod";
import { validateRequest } from "@/validations";


const baseFieldBodySchema = z.object({
  key: z.string().min(1).max(100),
  label: z.string().min(1).max(150),
  type: z.string().min(1).max(50),
  formId: z.number().int().positive(),
  validations: z.record(z.string(), z.any()).nullable().optional(),
  options: z.record(z.string(), z.any()).nullable().optional(),
  order_index: z.number().int().nonnegative(),
  depends_on_value: z.string().nullable().optional(),
  id_depends_on_field: z.number().int().positive().nullable().optional(),
})



export const validateFieldData = validateRequest(baseFieldBodySchema);


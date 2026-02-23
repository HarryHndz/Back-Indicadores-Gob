import { z } from "zod";
import { validateRequest } from "@/validations";


const baseFieldBodySchema = z.object({
  name: z.string().min(1).max(100),
  placeholder: z.string().min(1).max(250).nullable().optional(),
  label: z.string().min(1).max(150),
  type: z.string().min(1).max(50),
  id_form: z.number().int().positive(),
  id_topic: z.number().int().positive().nullable().optional(),
  validations: z.array(z.object({
    rule: z.string().min(1).max(50),
    value: z.any().nullable().optional(),
  })).nullable().optional(),
  options: z.array(z.object({
    label: z.string().min(1).max(100),
    value: z.string().min(1).max(100),
  })).nullable().optional(),
  order_index: z.number().int().nonnegative().nullable().optional(),
  depends_on_value: z.string().nullable().optional(),
  id_depends_on_field: z.number().int().positive().nullable().optional(),
})



export const validateFieldData = validateRequest(baseFieldBodySchema);


import { z } from "zod";
import { validateRequest } from "@/validations";

const baseTopicBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    id_form: z.number().int().positive(),
    year_fiscal: z.string().min(1).max(50).nullable().optional(),
    update_period: z.string().min(1).max(50).nullable().optional(),
  })

export const validateTopicData = validateRequest(baseTopicBodySchema)


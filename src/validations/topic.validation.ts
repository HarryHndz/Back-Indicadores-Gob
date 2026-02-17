import { z } from "zod";
import { validateRequest } from "@/validations";

const baseTopicBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    active: z.boolean().optional(),
    id_government_entity: z.number().int().positive(),
  })

export const validateTopicData = validateRequest(baseTopicBodySchema)


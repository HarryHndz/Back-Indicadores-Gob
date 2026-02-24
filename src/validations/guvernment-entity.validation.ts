import { z } from "zod";
import { validateRequest } from "@/validations";


const baseGuvernmentEntityBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    description: z.string().min(1).max(250),
    active: z.boolean().optional(),
    isHaveSubGubernment: z.boolean().optional(),
    subGubernment: z.array(z.object({
      name: z.string().min(1).max(150),
      description: z.string().min(1).max(250),
      active: z.boolean().optional(),
      id_parent_gubernment: z.number().int().positive().nullable().optional(),
    })).nullable().optional(),
    
  })

export const validateGuvernmentEntityData = validateRequest(baseGuvernmentEntityBodySchema);

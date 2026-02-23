import { z } from "zod";
import { validateRequest } from "@/validations";

const baseUserBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    email: z.email().min(1).max(150),
    password: z.string().min(6).max(150),
    id_rol: z.number().int().positive(),
    id_guvernment: z.number().int().positive(),
  })

export const validateUserData = validateRequest(baseUserBodySchema);


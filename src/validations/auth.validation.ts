import { z } from "zod";
import { validateRequest } from "@/validations";


const baseAuthBodySchema = z
  .object({
    email: z.email().min(1).max(150),
    password: z.string().min(6).max(150),
  })


export const validateLoginData = validateRequest(baseAuthBodySchema);


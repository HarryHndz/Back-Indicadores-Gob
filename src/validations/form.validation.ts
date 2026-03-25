import { z } from "zod";
import { validateRequest } from "@/validations";


const baseFormBodySchema = z
  .object({
    name: z.string().min(1).max(150),
    description: z.string().min(1).max(250),
    year_fiscal: z.string().min(1).max(50).nullable().optional(),
    update_period: z.string().min(1).max(50).nullable().optional(),
    id_guvernment: z.number().int().positive(),
    isHaveTopics: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isHaveTopics !== false) return;

    const empty = (v: unknown) =>
      v == null || (typeof v === "string" && v.trim().length === 0);

    if (empty(data.year_fiscal)) {
      ctx.addIssue({
        code: "custom",
        message: "el campo es requerido cuando el formulario no tiene temas",
        path: ["year_fiscal"],
      });
    }
    if (empty(data.update_period)) {
      ctx.addIssue({
        code: "custom",
        message: "el campo es requerido cuando el formulario no tiene temas",
        path: ["update_period"],
      });
    }
  });

export const validateFormData = validateRequest(baseFormBodySchema);


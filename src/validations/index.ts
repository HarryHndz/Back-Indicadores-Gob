import type { ZodType } from "zod";
import { ZodError, treeifyError } from "zod";
import { Request, Response, NextFunction } from "express";


export const validateRequest =(schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error: ZodError = result.error;
      return res.status(400).json({
        message: "Datos inválidos",
        errors: treeifyError(error),
      });
    }

    req.body = result.data;
    return next();
  };


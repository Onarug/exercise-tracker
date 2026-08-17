import { z } from "zod"
import { Request, Response, NextFunction } from "express"

export const validateRequest = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const flatErrors = result.error.issues.map((issue) => issue.message);

            return res.status(400).json({
                status: "error",
                data: flatErrors.join(", "),
            });
        }

        return next();
    }
}
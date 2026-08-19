import { z } from "zod";

export const objectIdSchema = z
    .string()
    .regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid ObjectId"
    );

export const listQuerySchema = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    q: z.string().optional(),
    isActive: z.string().optional(),
    includeDeleted: z.string().optional()
});
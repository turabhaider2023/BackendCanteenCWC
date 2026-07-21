import { z } from "zod";
import { objectIdSchema } from "./common.schema.js";

const itemNameSchema = z
    .string()
    .trim()
    .min(1, "Item name cannot be empty")
    .max(100, "Item name cannot exceed 100 characters");

const descriptionSchema = z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .max(500, "Description cannot exceed 500 characters");

export const createItemMasterSchema = z.object({
    body: z.object({
        itemName: itemNameSchema,
        itemCategoryId: objectIdSchema,
        description: descriptionSchema.optional()
    })
});

export const getAllItemMastersSchema = z.object({});

export const getItemMasterByIdSchema = z.object({
    params: z.object({
        itemMasterId: objectIdSchema
    })
});

export const updateItemMasterSchema = z.object({
    params: z.object({
        itemMasterId: objectIdSchema
    }),

    body: z.object({
        itemName: itemNameSchema.optional(),
        itemCategoryId: objectIdSchema.optional(),
        description: descriptionSchema.optional(),
        isActive: z.boolean().optional()
    })
});

export const deleteItemMasterSchema = z.object({
    params: z.object({
        itemMasterId: objectIdSchema
    })
});
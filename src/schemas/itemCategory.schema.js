import { z } from "zod";
import { objectIdSchema } from "./common.schema.js";

const ITEM_CATEGORY_NAME_SCHEMA = z
    .string()
    .trim()
    .min(1, "Item category name cannot be empty")
    .max(100, "Item category name cannot exceed 100 characters");

const DESCRIPTION_SCHEMA = z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .max(500, "Description cannot exceed 500 characters");

export const createItemCategorySchema = z.object({
    body: z.object({
        itemCategoryName: ITEM_CATEGORY_NAME_SCHEMA,
        description: DESCRIPTION_SCHEMA.optional()
    })
});

export const getAllItemCategoriesSchema = z.object({});

export const getItemCategoryByIdSchema = z.object({
    params: z.object({
        itemCategoryId: objectIdSchema
    })
});

export const updateItemCategorySchema = z.object({
    params: z.object({
        itemCategoryId: objectIdSchema
    }),

    body: z.object({
        itemCategoryName: ITEM_CATEGORY_NAME_SCHEMA.optional(),
        description: DESCRIPTION_SCHEMA.optional(),
        isActive: z.boolean().optional()
    })
});

export const deleteItemCategorySchema = z.object({
    params: z.object({
        itemCategoryId: objectIdSchema
    })
});
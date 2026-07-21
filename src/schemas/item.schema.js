import { z } from "zod";
import { objectIdSchema } from "./common.schema.js";

const itemNameSchema = z
    .string()
    .trim()
    .min(1, "Item name cannot be empty")
    .max(100, "Item name cannot exceed 100 characters");

const itemCodeSchema = z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "Item code cannot be empty")
    .max(20, "Item code cannot exceed 20 characters");

const descriptionSchema = z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .max(500, "Description cannot exceed 500 characters");

const stockSchema = z
    .coerce.number()
    .min(0, "Stock cannot be negative");

export const createItemSchema = z.object({
    body: z.object({
        itemName: itemNameSchema,
        itemCode: itemCodeSchema,
        itemCategoryId: objectIdSchema,
        unitId: objectIdSchema,
        brandId: objectIdSchema,
        description: descriptionSchema.optional(),
        isPerishable: z.boolean().optional(),
        minimumStock: stockSchema,
        maximumStock: stockSchema
    }).refine(
        (data) => data.maximumStock >= data.minimumStock,
        {
            message: "Maximum stock must be greater than or equal to minimum stock",
            path: ["maximumStock"]
        }
    )
});

export const getAllItemsSchema = z.object({});

export const getItemByIdSchema = z.object({
    params: z.object({
        itemId: objectIdSchema
    })
});

export const updateItemSchema = z.object({
    params: z.object({
        itemId: objectIdSchema,
       
    }),

    body: z.object({
        itemName: itemNameSchema.optional(),
        itemCode: itemCodeSchema.optional(),
        itemCategoryId: objectIdSchema.optional(),
        unitId: objectIdSchema.optional(),
        brandId: objectIdSchema.optional(),
        description: descriptionSchema.optional(),
        isPerishable: z.boolean().optional(),
        minimumStock: stockSchema.optional(),
        maximumStock: stockSchema.optional(),
        isActive: z.boolean().optional()
    }).refine(
        (data) => {
            if (
                data.minimumStock !== undefined &&
                data.maximumStock !== undefined
            ) {
                return data.maximumStock >= data.minimumStock;
            }

            return true;
        },
        {
            message: "Maximum stock must be greater than or equal to minimum stock",
            path: ["maximumStock"]
        }
    )
});

export const deleteItemSchema = z.object({
    params: z.object({
        itemId: objectIdSchema
    })
});
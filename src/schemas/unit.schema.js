import { z } from "zod";
import { objectIdSchema } from "./common.schema.js";

const unitNameSchema = z
    .string()
    .trim()
    .min(1, "Unit name cannot be empty")
    .max(100, "Unit name cannot exceed 100 characters");

const unitCodeSchema = z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "Unit code cannot be empty")
    .max(10, "Unit code cannot exceed 10 characters");

const descriptionSchema = z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .max(500, "Description cannot exceed 500 characters");

export const createUnitSchema = z.object({
    body: z.object({
        unitName: unitNameSchema,
        unitCode: unitCodeSchema,
        description: descriptionSchema.optional()
    })
});

export const getAllUnitsSchema = z.object({});

export const getUnitByIdSchema = z.object({
    params: z.object({
        unitId: objectIdSchema
    })
});

export const updateUnitSchema = z.object({
    params: z.object({
        unitId: objectIdSchema
    }),

    body: z.object({
        unitName: unitNameSchema.optional(),
        unitCode: unitCodeSchema.optional(),
        description: descriptionSchema.optional(),
        isActive: z.boolean().optional()
    })
});

export const deleteUnitSchema = z.object({
    params: z.object({
        unitId: objectIdSchema
    })
});
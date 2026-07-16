import { z } from "zod";
import { objectIdSchema } from "../schemas/common.schema.js"

const officeTypeNameSchema = z
    .string()
    .trim()
    .min(1,"Office type name cannot be empty")
    .max(100,"Office type name cannot exceed 100 characters")

const levelSchema = z
    .coerce
    .number()
    .int("Level must be an integer")
    .positive("Level must be a postive number")

export const createOfficeTypeSchema = z.object({
    body:z.object({
        officeTypeName:officeTypeNameSchema,
        level:levelSchema,

    })
})

export const updateOfficeTypeSchema = z.object({
    body:z.object({ 
        officeTypeName:officeTypeNameSchema.optional(),
        level:levelSchema.optional(),
        isActive:z.boolean().optional()}),
    
        params:z.object({
            officeTypeId:objectIdSchema
        })
})

export const deleteOfficeTypeSchema = z.object({
    params:z.object({
    officeTypeId:objectIdSchema
 })
})
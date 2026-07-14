import { z } from "zod";
import { objectIdSchema } from "../schemas/common.schema.js"

const designationNameSchema = z
    .string()
    .trim()
    .min(1,"Designation name cannot be empty")
    .max(100,"Designation cannot exceed 100 characters");


const levelSchema = z
    .coerce
    .number()
    .int("Level must be an integer")
    .positive("Level must be a postive number");


export const createDesignationSchema = z.object({
    body:z.object({
        designationName:designationNameSchema,
    level:levelSchema
    })

    })

export const updateDesignationSchema = z.object({
    body:z.object({
        designationName:designationNameSchema.optional(),
    level:levelSchema.optional(),
    isActive:z.boolean().optional()
    }),
    
    params:z.object({
        designationId:objectIdSchema
        
    })
})

export const deleteDesignationSchema = z.object({
    params:z.object({
        designationId:objectIdSchema
    })
})
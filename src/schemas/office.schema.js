import { z } from "zod";
import { objectIdSchema } from "./common.schema.js"

const officeNameSchema = z
    .string()
    .trim()
    .min(1,"Office name cannot be empty")
    .max(100,"Office name cannot exceed 100 characters")

const citySchema = z
    .string()
    .trim()
    .min(1,"city name cannot be empty")
    .max(100,"city name cannot exceed 100 characters")


const regionTypeSchema = z.enum(
    ["Headquarter", "Regional"],
    {
        error:"Region type must be either Headquarter or Regional"
    }

)

export const createOfficeSchema = z.object({
    body:z.object({
        officeName:officeNameSchema,
    parentOfficeId:objectIdSchema.optional(),
    officeTypeId:objectIdSchema,
    city:citySchema,
    regionType:regionTypeSchema
    })

})

export const updateOfficeSchema = z.object({
    body:z.object({
        officeName:officeNameSchema.optional(),
        parentOfficeId:objectIdSchema.optional(),
        officeTypeId:objectIdSchema.optional(),
        city:citySchema.optional(),
        regionType:regionTypeSchema.optional(),
        isActive:z.boolean().optional()
    }),
    params:z.object({
        officeId:objectIdSchema
    })
})

export const deleteOfficeSchema = z.object({
    params:z.object({
        officeId:objectIdSchema
    })
})


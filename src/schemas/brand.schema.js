import { z }  from "zod";
import { objectIdSchema } from "./common.schema.js"

const brandNameSchema = z
    .string()
    .trim()
    .min(1,"Brand name cannot be empty")
    .max(100,"Brand name cannot exceed 100 characters")

const descriptionSchema = z
    .string()
    .trim()
    .min(1,"Description cannot be empty")
    .max(500,"Description cannot exceed 500 characters")

export const createBrandSchema = z.object({
    body:z.object({
        brandName:brandNameSchema,
        description:descriptionSchema.optional()
    })
})

export const getAllBrandsSchema = z.object({

})

export const getBrandByIdSchema = z.object({
    params:z.object({
        brandId:objectIdSchema
    })
})

export const updateBrandSchema = z.object({
    params:z.object({
        brandId:objectIdSchema
    }),
    body:z.object({
        brandName:brandNameSchema.optional(),
        description:descriptionSchema.optional(),
        isActive:z.boolean().optional()
    })
})

export const deleteBrandSchema = z.object({
    params:z.object({
        brandId:objectIdSchema
    })
})
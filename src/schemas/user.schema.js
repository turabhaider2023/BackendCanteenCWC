import { z } from "zod";
import { objectIdSchema } from "./common.schema.js"

const nameSchema = z
    .string()
    .trim()
    .min(1,"Name cannot be empty")
    .max(100,"Name cannot exceed 100 characters")

const officialEmailSchema = z
    .string()
    .trim()
    .email("Invalid official email address")

const mobileNumberSchema = z
    .string()
    .trim()
    .regex(
        /^[6-9]\d{9}$/,
        "Invalid mobile number"
    );

export const createUserSchema = z.object({
    body:z.object({
        name:nameSchema,
        officialEmail:officialEmailSchema,
        mobileNumber:mobileNumberSchema,
        designationId:objectIdSchema,
        officeId:objectIdSchema,
        roles:z.array(objectIdSchema).optional()

    })
})

export const getUserByIdSchema = z.object({
    params:z.object({
        userId:objectIdSchema
    })
})
export const updateUserSchema = z.object({
    body:z.object({
        name:nameSchema.optional(),
        officialEmail:officialEmailSchema.optional(),
        mobileNumber:mobileNumberSchema.optional(),
        designationId:objectIdSchema.optional(),
        officeId:objectIdSchema.optional(),
        roles:z.array(objectIdSchema).optional()

    }),

    params:z.object({
        userId:objectIdSchema
    })
})

export const deleteUserSchema = z.object({
    params:z.object({
        userId:objectIdSchema
    })

})


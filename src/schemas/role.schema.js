import { z } from "zod";
import {objectIdSchema} from "./common.schema.js"


const roleNameSchema = z
    .string()
    .trim()
    .min(1,"Role name cannot be empty")
    .max(100,"Role name cannot exceed 100 characters")

export const createRoleSchema = z.object({
    body:z.object({
        roleName:roleNameSchema
    })
}
)

export const updateRoleSchema = z.object({
    body:z.object({
        roleName:roleNameSchema.optional(),
        isActive:z.boolean().optional()
    }),
    params:z.object({
        roleId:objectIdSchema
    })
})

export const deleteRoleSchema = z.object({
    params:z.object({
        roleId:objectIdSchema
    })
})


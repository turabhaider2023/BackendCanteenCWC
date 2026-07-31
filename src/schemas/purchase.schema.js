import { z } from "zod";
import { objectIdSchema } from "./common.schema.js"


const invoiceNoSchema = z
    .string()
    .trim()
    .min(1,"Invoice number cannot be empty")
    .max(50,"Invoice number cannot exceed 50 characters")

const invoiceDateSchema = z.iso.date({
        error:"Invalid invoice date"
    }
)


const remarksSchema = z
    .string()
    .trim()
    .min(1,"Remarks cannot be empty")
    .max(500,"Remarks cannot exceed 500 characters")

const purchasePriceSchema = z
    .number()
    .positive("Purchase price must be greater than 0")
    .refine(
        (value)=>Number(value.toFixed(2))===value,
        "Purchase price can have maximum 2 decimal places"
    )

const mrpSchema = z
    .number()
    .positive("MRP must be greater than 0")
    .refine(
        (value)=>Number(value.toFixed(2))===value,
        "MRP can have maximum 2 decimal places"
    )

const receivedQuantitySchema = z
    .number()
    .int("Received quantity must be an integer")
    .positive("Received quantity must be greater than 0")

const freeQuantitySchema = z
    .number()
    .int("Free quantity must be an integer")
    .nonnegative("Free quantity cannot be negative")
    .default(0)

const purchaseItemRequestSchema = z.object({
    itemId:objectIdSchema,
    receivedQuantity:receivedQuantitySchema,
    freeQuantity:freeQuantitySchema,
    purchasePrice:purchasePriceSchema,
    mrp:mrpSchema,
    remarks:remarksSchema.optional()
})
.superRefine((data,ctx)=>{
    if(data.mrp<data.purchasePrice){
        ctx.addIssue({
            code:"custom",
            path:["mrp"],
            message: "MRP must be greater than or equal to purchase price"
        })
    }
})


export const createPurchaseSchema = z.object({
    body:z.object({vendorId:objectIdSchema,
    invoiceNo:invoiceNoSchema,
    invoiceDate:invoiceDateSchema,
    remarks:remarksSchema.optional(),
    items:z
    .array(purchaseItemRequestSchema)
    .min(1,"At least one purchase item is required")})
})

export const getAllPurchasesSchema = z.object({
})

// 3
export const getPurchaseByIdSchema = z.object({
    params: z.object({
        purchaseId: objectIdSchema
    })
})

// 4
export const updatePurchaseSchema = z.object({
    params: z.object({
        purchaseId: objectIdSchema
    }),
    body: z.object({
        vendorId: objectIdSchema.optional(),
        invoiceNo: invoiceNoSchema.optional(),
        invoiceDate: invoiceDateSchema.optional(),
        remarks: remarksSchema.optional(),
        items: z
            .array(purchaseItemRequestSchema)
            .min(1, "At least one purchase item is required")
            .optional()
    })
    .superRefine((data, ctx) => {
        if (Object.keys(data).length === 0) {
            ctx.addIssue({
                code: "custom",
                path:[],
                message: "At least one field is required for update"
            });
        }
    })
})

// 5
export const receivePurchaseSchema = z.object({
    params: z.object({
        purchaseId: objectIdSchema
    })
})

// 6
export const cancelPurchaseSchema = z.object({
    params: z.object({
        purchaseId: objectIdSchema
    })
})
import { z } from "zod"
import { objectIdSchema } from "./common.schema.js"

const vendorNameSchema = z
    .string()
    .trim()
    .min(1,"Vendor name cannot be empty")
    .max(100,"Vendor name cannot exceed 100 characters")

const GST_NUMBER_REGEX =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const gstNumberSchema = z
    .string()
    .trim()
    .length(15,"GST number must be exactly 15 characters")
    .regex(GST_NUMBER_REGEX,"Invalid GST number")

const contactPersonSchema = z
    .string()
    .trim()
    .min(1,"Contact person cannot be empty")
    .max(100,"Contact person name cannot exceed 100 characters")

const MOBILE_NUMBER_REGEX = /^[6-9][0-9]{9}$/

const vendorMobileSchema = z
    .string()
    .trim()
    .regex(MOBILE_NUMBER_REGEX,"Invalid mobile number")

const vendorEmailSchema = z
    .string()
    .trim()
    .email("Invalid vendor email address")

const addressSchema = z
    .string()
    .trim()
    .min(1,"Vendor address cannot be empty")
    .max(100,"Vendor address cannot exceed 100 characters")

const stateSchema = z
    .string()
    .trim()
    .min(1,"State name cannot be empty")
    .max(100,"State name cannot exceed 100 characters")

const citySchema = z
    .string()
    .trim()
    .min(1,"City name cannot be empty")
    .max(100,"City name cannot exceed 100 characters")

const PIN_CODE_REGEX = /^[0-9]{6}$/
const pinCodeSchema = z
    .string()
    .trim()
    .regex(PIN_CODE_REGEX,"Invalid pincode")

    


    export const createVendorSchema = z.object({
        body:z.object({
            vendorName:vendorNameSchema,
            gstNumber:gstNumberSchema,
            contactPerson:contactPersonSchema.optional(),
            vendorMobile:vendorMobileSchema,
            vendorEmail:vendorEmailSchema,
            address:addressSchema,
            state:stateSchema,
            city:citySchema,
            pinCode:pinCodeSchema
        })
    })

    export const getAllVendorsSchema = z.object({

    })

    export const getVendorByIdSchema = z.object({
        params:z.object({
            vendorId:objectIdSchema
        })
    })

    export const updateVendorSchema = z.object({
        body:z.object({
             vendorName:vendorNameSchema.optional(),
            gstNumber:gstNumberSchema.optional(),
            contactPerson:contactPersonSchema.optional(),
            vendorMobile:vendorMobileSchema.optional(),
            vendorEmail:vendorEmailSchema.optional(),
            address:addressSchema.optional(),
            state:stateSchema.optional(),
            city:citySchema.optional(),
            pinCode:pinCodeSchema.optional()
        }),
        
        params:z.object({
            vendorId:objectIdSchema
        })
    })

    export const deleteVendorSchema = z.object({
        
        params:z.object({
            vendorId:objectIdSchema
        })
    })
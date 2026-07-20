import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import {createVendorService,
    getAllVendorsService,
    getVendorByIdService,
    updateVendorService,
    deleteVendorService
} from "../services/vendor.service.js"

export const createVendor = asyncHandler(async (req,res)=>{
    const newVendor = await createVendorService(req.body)

    return res.status(201).json(
        new ApiResponse(201,
            newVendor,
            "Vendor created successfully"
        )
    )
})

export const getAllVendors = asyncHandler(async (req,res)=>{
    const allVendors = await getAllVendorsService()

    return res.status(200).json(
        new ApiResponse(200,
            allVendors,
            "All vendors fetched successfully"
        )
    )
})

export const getVendorById = asyncHandler(async (req,res)=>{
 const vendor = await getVendorByIdService(req.params)
 return res.status(200).json(
    new ApiResponse(200,
        vendor,
        "Vendor fetched successfully"
    )
 )
})

export const updateVendor = asyncHandler(async (req,res)=>{
 const updatedVendor = await updateVendorService({
    vendorId:req.params.vendorId,
    ...req.body
 })

 return res.status(200).json(
    new ApiResponse(200,
        updatedVendor,
        "Vendor updated successfully"
    )
 )
}) 

export const deleteVendor = asyncHandler(async (req,res)=>{
 const deletedVendor = await deleteVendorService(req.params)

 return res.status(200).json(
    new ApiResponse(200,
        deletedVendor,
        "Vendor soft deleted successfully"
    )
 )
})
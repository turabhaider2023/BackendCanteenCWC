import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"

import {
    createBrandService,
    getAllBrandsService,
    getBrandByIdService,
    updateBrandService,
    deleteBrandService
} from "../services/brand.services.js"


export const createBrand = asyncHandler(async(req,res)=>{
    const newBrand = await createBrandService(req.body)

    return res.status(201).json(
        new ApiResponse(201,
            newBrand,
            "Brand created successfully"
        )
    )
})

export const getAllBrands = asyncHandler(async(req,res)=>{
    const allBrands = await getAllBrandsService()

    return res.status(200).json(
        new ApiResponse(200,
            allBrands,
            "All brands fetched successfully"
        )
    )
})

export const getBrandById = asyncHandler(async(req,res)=>{
    const brand = await getBrandByIdService(req.params)

    return res.status(200).json(
        new ApiResponse(200,
            brand,
            "Brand fetched successfully"
        )
    )
})

export const updateBrand = asyncHandler(async(req,res)=>{
    const updatedBrand = await updateBrandService({
        brandId:req.params.brandId,
        ...req.body
    })

    return res.status(200).json(
        new ApiResponse(200,
            updatedBrand,
            "Brand updated successfully"
        )
    )
})

export const deleteBrand = asyncHandler(async(req,res)=>{
    const deletedBrand = await deleteBrandService(req.params)

    return res.status(200).json(
        new ApiResponse(200,
            deletedBrand,
            "Brand deleted successfully"
        )
    )
})


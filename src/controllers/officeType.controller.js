import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {createOfficeTypeService,
    getAllOfficeTypesService,
    updateOfficeTypeService,
    deleteOfficeTypeService } from "../services/officeType.service.js"
import { OfficeType } from "../models/officeType.js";


export const createOfficeType = asyncHandler(async(req,res)=>{

        const newOfficeType=await createOfficeTypeService(req.body)

        return res.status(201).json(
            new ApiResponse(
                201,
                newOfficeType,
                "Office type created successfully"
            )
        )

   
})

export const getAllOfficeTypes = asyncHandler(async(req,res)=>{
        
        const allOfficeTypes = await getAllOfficeTypesService()

        return res.status(200).json(
            new ApiResponse(
                200,
                allOfficeTypes,
                "All office types fetched successfully"

            )
        )
            
    
})

export const updateOfficeType = asyncHandler(async(req,res)=>{

        const updatedOfficeType = await updateOfficeTypeService({
            officeTypeId:req.params.officeTypeId,
            ...req.body
        })
       
        return res.status(200).json(
            new ApiResponse(
                200,
                updatedOfficeType,
                "Office type updated successfully"

            )
            
        )
        
    
})

export const deleteOfficeType = asyncHandler(async(req,res)=>{
        
    const deletedOfficeType = await deleteOfficeTypeService({officeTypeId:req.params.officeTypeId})

        return res.status(200).json(
            new ApiResponse(
                200,
                deletedOfficeType,
                "Office type soft deleted successfully"

            )

        )
   
})
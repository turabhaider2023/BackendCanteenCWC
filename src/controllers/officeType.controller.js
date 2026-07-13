import {
    createOfficeTypeValidation,
    updateOfficeTypeValidation,
    deleteOfficeTypeValidation
                                
    } from "../validations/officeType.validation.js";
import { OfficeType } from "../models/officeType.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createOfficeType = asyncHandler(async(req,res)=>{
        await createOfficeTypeValidation(req)
        const {officeTypeName,level}=req.body;

        const newOfficeType = await OfficeType.create({
            officeTypeName:officeTypeName.trim(),
            level:Number(level)
        }
        )

        return res.status(201).json(
            new ApiResponse(
                201,
                newOfficeType,
                "Office type created successfully"
            )
        )

   
})

export const getAllOfficeTypes = asyncHandler(async(req,res)=>{
        const allOfficeTypes = (await OfficeType
            .find({isDeleted:false})
            .sort({officeTypeName:1})
        )

        return res.status(200).json(
            new ApiResponse(
                200,
                allOfficeTypes,
                "All office types fetched successfully"

            )
        )
            
    
})

export const updateOfficeType = asyncHandler(async(req,res)=>{
        await updateOfficeTypeValidation(req)

        const {officeTypeId}=req.params

        const {officeTypeName,level,isActive} = req.body

        const updateData = {}

        if(officeTypeName!==undefined){
            updateData.officeTypeName=officeTypeName.trim()
        }

        if(level!==undefined){
            updateData.level = Number(level)
        }

        if(isActive!==undefined&& typeof isActive ==="boolean"){
            updateData.isActive=isActive
        }

        const updatedOfficeType=await OfficeType.findByIdAndUpdate(
            officeTypeId,
            updateData,
            { returnDocument: "after" }
        )

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedOfficeType,
                "Office type updated successfully"

            )
            
        )
        
    
})

export const deleteOfficeType = asyncHandler(async(req,res)=>{
        await deleteOfficeTypeValidation(req)

        const {officeTypeId} = req.params

        const deletedOfficeType = await OfficeType.findByIdAndUpdate(
            officeTypeId,
            {
             isDeleted:true,
             isActive:false,
            },
            { returnDocument: "after" }
    )

        return res.status(200).json(
            new ApiResponse(
                200,
                deletedOfficeType,
                "Office type soft deleted successfully"

            )

        )
   
})
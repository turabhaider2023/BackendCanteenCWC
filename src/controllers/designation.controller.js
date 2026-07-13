import {Designation} from "../models/designation.js"
import {validateCreateDesignation,validateUpdateDesignation,validateDeleteDesignation} from "../validations/designation.validation.js"
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createDesignation = asyncHandler(async (req,res)=>{
    
        await validateCreateDesignation(req)

        const{designationName,level}=req.body

        const newRecord = await Designation.create({
            designationName:designationName.trim(),
            level:Number(level),

        })
       
        return res.status(201).json(
            new ApiResponse(
                201,
                newRecord,
                "Designation created successfully"

            )
        
        )
    
    
})

export const getAllDesignations = asyncHandler(async (req,res)=>{
        const allDesignations = await Designation
        .find({isDeleted:false})
        .sort({designationName:1})
        return res.status(200).json(
            new ApiResponse(
                200,
                allDesignations,
                "All designations fetched successfully"
            ))
  
})

export const updateDesignation = asyncHandler(async (req,res)=>{
        await validateUpdateDesignation(req)
        const {designationId} = req.params

        const {designationName,level,isActive} = req.body

        const updateData = {}

        if(designationName!==undefined){
            updateData.designationName=designationName.trim()
        }

        if(level!==undefined){
            updateData.level=Number(level)
        }

        if(isActive!==undefined){
            updateData.isActive=isActive;
        }
        const updatedDesignation = await Designation.findByIdAndUpdate(
            designationId,
            updateData,
            {returnDocument: "after"})
        
        return res.status(200).json(
            new ApiResponse(
                200,
                updatedDesignation,
                "Designation updated successfully"

            )
            
        )
   
})

export const deleteDesignation = asyncHandler(async (req,res)=>{
  
        await validateDeleteDesignation(req)
        const { designationId } = req.params;

        const deletedDesignation = await Designation.findByIdAndUpdate(
            designationId,
            {isDeleted:true,
             isActive:false
            },
            {returnDocument:"after"}
        )

        return res.status(200).json(
            new ApiResponse(
                200,
                deleteDesignation,
                "Designation soft deleted successfully"
            )
        )
    
    
})
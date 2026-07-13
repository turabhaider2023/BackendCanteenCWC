import {createOfficeValidation
    ,updateOfficeValidation,
    deleteOfficeValidation
} from "../validations/office.validation.js"
import { Office } from "../models/office.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"

export const createOffice = asyncHandler(async(req,res)=>{
        await createOfficeValidation(req)
        const {officeName,parentOfficeId,officeTypeId,city,regionType} =req.body

        const officeData = {
            officeName:officeName.trim(),
            officeTypeId,
            regionType
        }

        if(city!==undefined){
            officeData.city=city.trim()
        }

        if(parentOfficeId!==undefined){
            officeData.parentOfficeId=parentOfficeId;
        }

        const newOffice = await Office.create(officeData)

        return res.status(201).json(
            new ApiResponse(
                201,
                newOffice,
                "Office created successfully"

            )
        )
    
    
})

export const getAllOffices = asyncHandler(async(req,res)=>{
        const allOffices = await Office
        .find({
            isDeleted:false
        })
        .sort({officeName:1})

        return res.status(200).json(
            new ApiResponse(
                200,
                allOffices,
                "all offices fetched successfully"

            )
        )
    
})

export const updateOffice = asyncHandler(async (req,res)=>{

        await updateOfficeValidation(req)
        const {officeId} = req.params
        const {officeName
            , parentOfficeId
            ,officeTypeId
            ,city
            ,regionType
            ,isActive} = req.body

    const updateData = {}

    if(officeName!==undefined){
        updateData.officeName=officeName.trim()

    }

    if(parentOfficeId!==undefined){
        updateData.parentOfficeId=parentOfficeId
    }

    if(officeTypeId!==undefined){
        updateData.officeTypeId=officeTypeId
    }

    if(city!==undefined){
        updateData.city=city.trim()
    }

    if(regionType!==undefined){
        updateData.regionType=regionType;
    }

    if(isActive!==undefined){
        updateData.isActive=isActive
    }
     
    const updatedOffice = await Office.findByIdAndUpdate(
        officeId,
        updateData,
        {returnDocument:"after"}
    )
    return res.status(200).json(
        new ApiResponse(
            200,
            updatedOffice,
            "office updated successfully"
        )
   )

})

export const deleteOffice = asyncHandler(async (req,res)=>{
        await deleteOfficeValidation(req)
        const {officeId} = req.params
        
        const deletedOffice = await Office.findByIdAndUpdate(
            officeId,
            {isDeleted:true,
             isActive:false
            },
            {returnDocument:"after"}
        )

        return res.status(200).json(
            new ApiResponse(
                200,
                deletedOffice,
                "office deleted successfully"

            )
        )
   
})
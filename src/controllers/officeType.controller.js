import {
    createOfficeTypeValidation,
    updateOfficeTypeValidation,
    deleteOfficeTypeValidation
                                
    } from "../validations/officeType.validation.js";
import { OfficeType } from "../models/officeType.js";

export const createOfficeType = async(req,res)=>{
    try {
        await createOfficeTypeValidation(req)
        const {officeTypeName,level}=req.body;

        const newOfficeType = await OfficeType.create({
            officeTypeName:officeTypeName.trim(),
            level:Number(level)
        }
        )

        return res.status(201).json({
            message:"officeType created successfully",
            data:newOfficeType
        })

    } catch (error) {
        return res.status(400).json({
            message:"error in creating officeType",
            error:error.message
        })
        
    }
}

export const getAllOfficeTypes = async(req,res)=>{
    try {
        const allOfficeTypes = (await OfficeType
            .find({isDeleted:false})
            .sort({officeTypeName:1})
        )

        return res.status(200).json({
            message:"all officeTypes are here",
            data:allOfficeTypes
        })
    } catch (error) {
         return res.status(400).json({
            message:"error in fetching all officeType",
            error:error.message
         })
    }
}

export const updateOfficeType = async(req,res)=>{
    try {
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

        return res.status(200).json({
            message:"officeType updated successfully",
            data:updatedOfficeType
        })
        
    } catch (error) {
        return res.status(400).json({
            message:"error in updating officeType",
            error:error.message
        })
    }
}

export const deleteOfficeType = async(req,res)=>{
    try {
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

        return res.status(200).json({
            message:"officeType soft deleted successfully",
            data:deletedOfficeType

        })
    } catch (error) {
            return res.status(400).json({
                message:"error in deleting officeType",
                error:error.message
            })
    }
}
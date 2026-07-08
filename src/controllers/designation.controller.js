import mongoose from "mongoose"
import {Designation} from "../models/designation.js"
import {validateCreateDesignation,validateUpdateDesignation,validateDeleteDesignation} from "../validations/designation.validation.js"

export const createDesignation = async(req,res)=>{
    try {
        await validateCreateDesignation(req)

        const{designationName,level}=req.body

        const newRecord = await Designation.create({
            designationName:designationName.trim(),
            level:Number(level),

        })
        return res.status(201).json({
            message:"designation created successfully",
            data:newRecord
        })
    
    }
    catch (error) {
        res.status(400).json({
            message:"error in creating the designation",
            error:error.message
        })
        
    }
}

export const getAllDesignations = async(req,res)=>{
    try {
        const allDesignations = await Designation
        .find({isDeleted:false})
        .sort({designationName:1})
        return res.status(200).json({
            message:"all designations fetched successfully",
            data:allDesignations
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
        })
    }
}

export const updateDesignation = async(req,res)=>{
    try {
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
            {new:true})
        
        return res.status(200).json({
            message:"designation updated successfully",
            data:updatedDesignation
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in updating the designation",
            error:error.message
        })
    }
}

export const deleteDesignation = async(req,res)=>{
    try {
        await validateDeleteDesignation(req)
        const { designationId } = req.params;

        const deleteDesignation = await Designation.findByIdAndUpdate(
            designationId,
            {isDeleted:true,
             isActive:false
            },
            {new:true}
        )

        return res.status(200).json({
            message:"designation soft deleted successfully",
            data:deleteDesignation
        })
    } catch (error) {
        res.status(400).json({
            message:"error in deleting the designation",
            error:error.message
        })
    }
}
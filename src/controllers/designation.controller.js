import {Designation} from "../models/designation.js"
import {validateCreateDesignation} from "../validations/designation.validation.js"

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
        
    } catch (error) {
        
    }
}

export const deleteDesignation = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
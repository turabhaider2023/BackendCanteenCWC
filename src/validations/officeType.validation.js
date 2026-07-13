import {OfficeType} from "../models/officeType.js"
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js"

export const createOfficeTypeValidation = async(req)=>{
    const {officeTypeName,level} = req.body

    if(!officeTypeName||!level){
        throw new ApiError(400,
            "Office type name and level are required")
    }
    
    if(officeTypeName.trim()===""){
        throw new ApiError(400,
            "Office type name cannot be empty")
    }

    if(isNaN(Number(level))){
        throw new ApiError(400,
            "Level must be a number")
    }

    // db validation

    const existingOfficeType = await OfficeType.findOne({
        officeTypeName:officeTypeName.trim(),
        isDeleted:false
    })

    if(existingOfficeType){
        throw new ApiError(409,
            "Office type already exists")
    }
}

export const updateOfficeTypeValidation = async(req)=>{
    const {officeTypeId} = req.params
    const {officeTypeName,level,isActive} = req.body

    if(Object.keys(req.body).length===0){
        throw new ApiError(
            400,
            "Cannot update the empty object")
    }
    if(officeTypeName!==undefined){
        if(officeTypeName.trim()===""){
            throw new ApiError(
                400,
                "Office type name cannot be empty")
        }
    }

    if(level!==undefined){
        if(isNaN(Number(level))){
            throw new ApiError(
                400,
                "Level must be a number")
        }
    }
    if(isActive!==undefined && typeof isActive!=="boolean"){
        
        throw new ApiError(
            400,
            "isActive must be either true or false")
    }

    const allowedUpdates = ["officeTypeName","level","isActive"]

    const updatekeys = Object.keys(req.body)

    const validUpdate = updatekeys.every((field)=>
    allowedUpdates.includes(field))

    if(!validUpdate){
        throw new ApiError(
            400,
            "Cannot update this field ")
    }

    //db validation
    if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
        throw new ApiError(
            400,
            "Office type ID is not valid")
    }

    const officeType = await OfficeType.findOne({
    _id: officeTypeId,
    isDeleted: false
    });

    if (!officeType) {
        throw new ApiError(
            404,
            "Office type not found"
        );
    }
    // duplicate officeType check

    if(officeTypeName!==undefined){
        const existingOfficeType = await OfficeType.findOne({
            officeTypeName:officeTypeName.trim(),
            isDeleted:false,
            _id:{$ne:officeTypeId}
        })
        if(existingOfficeType){
            throw new ApiError(
                409,
                "Office type already exists")
        }
    }
    
}
export const deleteOfficeTypeValidation = async(req)=>{
    const {officeTypeId} = req.params

     if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
        throw new ApiError(
            400,
            "office type ID is not valid")
     }

     const existingOfficeType = await OfficeType.findOne({
        _id:officeTypeId,
        isDeleted:false
})

    if(!existingOfficeType){
        throw new ApiError(
            404,
            "office type not found")
    }
}
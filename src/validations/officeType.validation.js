import {OfficeType} from "../models/officeType.js"
import mongoose from "mongoose";

export const createOfficeTypeValidation = async(req)=>{
    const {officeTypeName,level} = req.body

    if(!officeTypeName||!level){
        throw new Error("officeType and level both are required")
    }
    
    if(officeTypeName.trim()===""){
        throw new Error("officeType is empty")
    }

    if(isNaN(Number(level))){
        throw new Error("level is not a number")
    }

    // db validation

    const isExist = await OfficeType.findOne({
        officeTypeName:officeTypeName.trim(),
        isDeleted:false
    })

    if(isExist){
        throw new Error("officeType already exists")
    }
}

export const updateOfficeTypeValidation = async(req)=>{
    const {officeTypeId} = req.params
    const {officeTypeName,level,isActive} = req.body

    if(Object.keys(req.body).length===0){
        throw new Error("can not update the empty object")
    }
    if(officeTypeName!==undefined){
        if(officeTypeName.trim()===""){
            throw new Error("officeTypeName is empty")
        }
    }

    if(level!==undefined){
        if(isNaN(Number(level))){
            throw new Error("level is not a number")
        }
    }
    if(isActive!==undefined && typeof isActive!=="boolean"){
        
        throw new Error("isActive must be true or false")
    }

    const allowedUpdates = ["officeTypeName","level","isActive"]

    const updatekeys = Object.keys(req.body)

    const validUpdate = updatekeys.every((field)=>
    allowedUpdates.includes(field))

    if(!validUpdate){
        throw new Error("can not update this ")
    }

    //db validation
    if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
        throw new Error("officeTypeId is not valid")
    }

    // duplicate officeType check

    if(officeTypeName!==undefined){
        const existingOfficeType = await OfficeType.findOne({
            officeTypeName:officeTypeName.trim(),
            isDeleted:false,
            _id:{$ne:officeTypeId}
        })
        if(existingOfficeType){
            throw new Error("officeType already exists")
        }
    }
    
}
export const deleteOfficeTypeValidation = async(req)=>{
    const {officeTypeId} = req.params

     if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
        throw new Error("officeTypeId is not valid")
     }

     const isExist = await OfficeType.findOne({
        _id:officeTypeId,
        isDeleted:false
})

    if(!isExist){
        throw new Error("officeType does not exist")
    }
}
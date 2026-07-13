import {Designation} from "../models/designation.js"
import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"

export const validateCreateDesignation = async(req)=>{
        const {designationName,level}=req.body
        

        if(!designationName || !level){
            throw new ApiError(
                400,
                "Designation and level both are required"
            )
        }

        const trimmedDesignationName = designationName.trim()

        if(trimmedDesignationName===""){
           throw new ApiError(
            400,
            "Designation cannot be empty"
           )
        }

        if(isNaN(Number(level))){
            throw new ApiError(
                400,
                "Level must be a number")
        }

        
        const existingDesignation = await Designation
        .findOne({
            designationName:trimmedDesignationName,
            isDeleted:false
        })

        if(existingDesignation){
            throw new ApiError(
                409,
                "Designation already exists")
        }
}

export const validateUpdateDesignation = async(req)=>{
    const {designationId} = req.params
    const {designationName,level,isActive} = req.body

    if(Object.keys(req.body).length===0){
        throw new ApiError(
            400,
            "Can not update empty request body")
    }
    
    const allowedUpdates = ["designationName" ,"level", "isActive"]

    const bodyKeys = Object.keys(req.body)

    const isValidUpdate=bodyKeys.every((field)=>
        allowedUpdates.includes(field)
    )

    if(!isValidUpdate){
        throw new ApiError(
            400,
            "Updating this field is not allowed")
    }

    if(designationName!==undefined){
        if(designationName.trim()===""){
            throw new ApiError(
                400,
                "Designation name cannot be empty")
        }
    }

    if(level!==undefined){
        if(isNaN(Number(level))){
            throw new ApiError(
                400,
                "Level must be a number")
        }
    }

    //DB validations

    if(!mongoose.Types.ObjectId.isValid(designationId)){
        throw new ApiError(
            400,
            "DesignationId is not valid")
    }
    const designation = await Designation.findOne({
    _id: designationId,
    isDeleted: false
});

if (!designation) {
    throw new ApiError(
        404,
        "Designation not found"
    );
}
    
    if(designationName!==undefined){
        const existingDesignation = await Designation.findOne({
            designationName:designationName.trim(),
            isDeleted:false,
            _id:{$ne:designationId}
        })

        if(existingDesignation){
            throw new ApiError(
                409,
                "Designation already exists")
        }
    }
}

export const validateDeleteDesignation = async(req)=>{
      const {designationId} = req.params
      

        if(!mongoose.Types.ObjectId.isValid(designationId)){
            throw new ApiError(
                400,
                "Designation ID is not valid")
        }

        const existingDesignation = await Designation.findOne({
            _id:designationId ,
            isDeleted:false
                                    })
        
        if(!existingDesignation){
            throw new ApiError(
                404,
                "Designation not found")
        }


        
}
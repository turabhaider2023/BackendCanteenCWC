import {Designation} from "../models/designation.js"
import mongoose from "mongoose"

export const validateCreateDesignation = async(req)=>{
        const {designationName,level}=req.body
        

        if(!designationName || !level){
            throw new Error("designation and level both are required")
        }

        const trimmedDesignationName = designationName.trim()

        if(trimmedDesignationName===""){
            throw new Error("designation can not be empty")
        }

        if(isNaN(Number(level))){
            throw new Error("level must be a number")
        }

        
        const isExist = await Designation
        .findOne({
            designationName:trimmedDesignationName,
            isDeleted:false
        })

        if(isExist){
            throw new Error("designation already exist")
        }
}

export const validateUpdateDesignation = async(req)=>{
    const {designationId} = req.params
    const {designationName,level,isActive} = req.body

    if(Object.keys(req.body).length===0){
        throw new Error("can not update empty body")
    }
    
    const allowedUpdates = ["designationName" ,"level", "isActive"]

    const bodyKeys = Object.keys(req.body)

    const isValidUpdate=bodyKeys.every((field)=>
        allowedUpdates.includes(field)
    )

    if(!isValidUpdate){
        throw new Error("updating this field is not allowed")
    }

    if(designationName!==undefined){
        if(designationName.trim()===""){
            throw new Error("designationName is empty")
        }
    }

    if(level!==undefined){
        if(isNaN(Number(level))){
            throw new Error("level is not a number")
        }
    }

    //DB validations

    if(!mongoose.Types.ObjectId.isValid(designationId)){
        throw new Error("please enter a valid designationId")
    }
    
    if(designationName!==undefined){
        const existingDesignation = await Designation.findOne({
            designationName:designationName.trim(),
            isDeleted:false,
            _id:{$ne:designationId}
        })

        if(existingDesignation){
            throw new Error("designation already exist")
        }
    }
}

export const validateDeleteDesignation = async(req)=>{
      const {designationId} = req.params
      

        if(!mongoose.Types.ObjectId.isValid(designationId)){
            throw new Error("designationId is not valid")
        }

        const isExist = await Designation.findOne({
            _id:designationId ,
            isDeleted:false
                                    })
        
        if(!isExist){
            throw new Error("designation does not exist")
        }


        
}
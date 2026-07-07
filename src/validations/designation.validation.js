import {Designation} from "../models/designation.js"

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
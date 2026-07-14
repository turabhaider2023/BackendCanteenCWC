import {Designation} from "../models/designation.js"
import ApiError from "../utils/ApiError.js"

export const validateCreateDesignation = async(req)=>{
       const {designationName}=req.body
        const existingDesignation = await Designation
        .findOne({
            designationName,
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
    const {designationName} = req.body


    //DB validations


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
            designationName:designationName,
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
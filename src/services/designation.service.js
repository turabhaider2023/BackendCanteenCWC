import { Designation } from "../models/designation.js"
import ApiError from "../utils/ApiError.js"

export const createDesignationService = async (data)=>{
         const {designationName,level}=data
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
          try{
             const newRecord = await Designation.create({
              designationName,
              level,
  
          })
  
          return newRecord;
        }
    catch (error) {
        if(error.code===11000){
            throw new ApiError(
                409,
                "Designation already exists"
        
            )
        }

            throw error;
        
        
      }}
  
      

export const getAllDesignationsService = async ()=>{
        const allDesignations = await Designation
        .find({isDeleted:false})
        .sort({designationName:1})

        return allDesignations;
}

export const updateDesignationService = async (data)=>{

        const {designationId,designationName,level,isActive} = data

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

        if (designationName !== undefined) {

        const existingDesignation = await Designation.findOne({
            designationName,
            isDeleted: false,
            _id: { $ne: designationId }
        });

        if (existingDesignation) {
            throw new ApiError(
                409,
                "Designation already exists"
            );
        }
}

        const updateData = {}

        if(designationName!==undefined){
            updateData.designationName=designationName
        }

        if(level!==undefined){
            updateData.level=level
        }

        if(isActive!==undefined){
            updateData.isActive=isActive;
        }

        try{
        const updatedDesignation = await Designation.findByIdAndUpdate(
            designationId,
            updateData,
            {returnDocument: "after",
             runValidators:true
            })

            return updatedDesignation;

        }
        catch (error) {
        if(error.code===11000){
            throw new ApiError(
                409,
                "Designation already exists"
        
            )
        }

            throw error;
        
        
      }
}

export const deleteDesignationService = async (data)=>{

    const { designationId } = data;
    const existingDesignation = await Designation.findOne({
    _id: designationId,
    isDeleted: false
    });

    if (!existingDesignation) {
        throw new ApiError(
            404,
            "Designation not found"
        );
    }

         const deletedDesignation = await Designation.findByIdAndUpdate(
            designationId,
            {isDeleted:true,
             isActive:false
            },
            {returnDocument:"after"}
        )

        return deletedDesignation;
}
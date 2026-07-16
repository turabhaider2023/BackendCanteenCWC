import { OfficeType } from "../models/officeType.js"
import ApiError from "../utils/ApiError.js"

export const createOfficeTypeService = async(data)=>{
        const {officeTypeName,level} = data

        const existingOfficeType = await OfficeType.findOne({
            officeTypeName,
            isDeleted:false
        })

        if(existingOfficeType){
            throw new ApiError(
                409,
                "Office type already exists"
            )
        }

        try {
            const newOfficeType = await OfficeType.create({
                officeTypeName,
                level
            }
            )
    
            return newOfficeType;
        } catch (error) {
                if(error.code===11000){
                    throw new ApiError(
                        409,
                        "Office type already exists"
                    )
                }

                throw error
            }
            
        }


export const getAllOfficeTypesService = async()=>{
    const allOfficeTypes = await OfficeType
            .find({isDeleted:false})
            .sort({officeTypeName:1})

            return allOfficeTypes
}

export const updateOfficeTypeService = async (data)=>{

        const {officeTypeId,officeTypeName,level,isActive} = data

        const existingOfficeType= await OfficeType.findOne({
            _id:officeTypeId,
            isDeleted:false
        })

        if(!existingOfficeType){
            throw new ApiError(
                404,
                "Office type not found"
            )
        }

        if(officeTypeName !==undefined){
            const duplicateOfficeType = await OfficeType.findOne({
                officeTypeName,
                isDeleted:false,
                _id:{$ne:officeTypeId}
            })

            if(duplicateOfficeType){
                throw new ApiError(
                    409,
                    "Office type already exists"
                )
            }
        }

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

        try {
            const updatedOfficeType=await OfficeType.findByIdAndUpdate(
                officeTypeId,
                updateData,
                { returnDocument: "after" ,
                  runValidators:true
                }
            )
    
            return updatedOfficeType;
        } catch (error) {
            if(error.code===11000){
                throw new ApiError(
                    409,
                    "Office type already exists"
                )
            }

            throw error
            
        }

}

export const deleteOfficeTypeService = async (data)=>{
        const {officeTypeId} = data

        const existingOfficeType = await OfficeType.findOne({
            _id:officeTypeId,
            isDeleted:false
        })

        if(!existingOfficeType){
            throw new ApiError(
                404,
                "Office type not found"
            )
        }

         const deletedOfficeType = await OfficeType.findByIdAndUpdate(
             officeTypeId,
             {
              isDeleted:true,
              isActive:false,
             },
             { returnDocument: "after"
              }
     )
 
         return deletedOfficeType
       

       
}
import { Office } from "../models/office.js";
import { OfficeType } from "../models/officeType.js";
import ApiError from "../utils/ApiError.js";

export const createOfficeService = async (data)=>{

    const {officeName,parentOfficeId,officeTypeId,city,regionType} = data
    const existingOffice = await Office.findOne({
        officeName,
        isDeleted:false
    })
    

    if(existingOffice){
        throw new ApiError(
            409,
            "Office already exists"
        )
    }

   const existingOfficeTypeId = await OfficeType.findOne({
    _id:officeTypeId,
    isDeleted:false
   })

   if(!existingOfficeTypeId){
    throw new ApiError(
        404,
        "Office type not found"
    )
   }

   if(regionType==="Regional"){
      if(!parentOfficeId){
            throw new ApiError(
                400,
                "Parent office is required for regional offices"
            )
      }
   }

   if(parentOfficeId){
        const existingParentOffice = await Office.findOne({
            _id:parentOfficeId,
            isDeleted:false
        })

        if(!existingParentOffice){
            throw new ApiError(
                404,
                "Parent office not found"
            )
        }
   }

   try {
    const newOffice = await Office.create({
     officeName,
     parentOfficeId,
     officeTypeId,
     city,
     regionType
    })

    return newOffice;
   } catch (error) {
        if(error.code===11000){
            throw new ApiError(
                409,
                "Office already exists"
            )
        }

        throw error;
    
   }
}
   

export const getAllOfficesService = async ()=>{
    const getAllOffices = await Office
    .find({isDeleted:false})
    .sort({officeName:1})

    return getAllOffices;
}

export const updateOfficeService = async (data)=>{
    const {officeId,officeName,parentOfficeId,officeTypeId,city,regionType,isActive}=data
    const existingOffice = await Office.findOne({
        _id:officeId,
        isDeleted:false
    })

    if(!existingOffice){
        throw new ApiError(
            404,
            "Office not found"
        )
    }

    if(officeName!==undefined){
        
        const duplicateOffice = await Office.findOne({
        officeName,
        isDeleted:false,
        _id:{$ne:officeId}
    })

        if(duplicateOffice){
            throw new ApiError(
                409,
                "Office already exists"
            )
        }

    }
    
    if(officeTypeId!==undefined){
        
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


    }

    if(parentOfficeId !==undefined){

        if(parentOfficeId.toString()===officeId.toString()){
            throw new ApiError(
                400,
                "Office cannot be its own parent"
            )
        }
        const existingParentOffice = await Office.findOne({
            _id:parentOfficeId,
            isDeleted:false
        })

        if(!existingParentOffice){
            throw new ApiError(
                404,
                "Parent office not found"
            )
        }
    }

    if(regionType==="Regional"){
        if(!parentOfficeId){
            throw new ApiError(
                400,
                "Parent Office is required for regional office"
            )
        }
    }

    const updatedData = {}

    if(officeName!==undefined){
        updatedData.officeName=officeName
    }

    if(parentOfficeId!==undefined){
        updatedData.parentOfficeId=parentOfficeId
    }

    if(officeTypeId!==undefined){
        updatedData.officeTypeId=officeTypeId
    }

    if(city!==undefined){
        updatedData.city = city
    }
    
    if(regionType!==undefined){
        updatedData.regionType = regionType
    }

    if(isActive!==undefined){
        updatedData.isActive = isActive
    }


    try {
        const updatedOffice = await Office.findByIdAndUpdate(
            officeId,
            updatedData,

            {returnDocument:"after",
             runValidators:true
            }
       
    )

    return updatedOffice;
}
catch (error) {
        if(error.code===11000){
            throw new ApiError(
                409,
                "Office already exists"
            )
        }

        throw error;
    }



} 

export const deleteOfficeService = async (data)=>{

    const {officeId} = data
    const existingOffice = await Office.findOne({
        _id:officeId,
        isDeleted:false
    })

    if(!existingOffice){
        throw new ApiError(
            404,
            "Office not found"
        )
    }

    const deletedOffice = await Office.findByIdAndUpdate(
        officeId,
        {
            isDeleted:true,
            isActive:false
        },
        {returnDocument:"after"}
    )

    return deletedOffice
}
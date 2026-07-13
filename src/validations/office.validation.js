import mongoose from "mongoose";
import {Office} from "../models/office.js"
import {OfficeType} from "../models/officeType.js"
import ApiError from "../utils/ApiError.js";

export const createOfficeValidation = async(req)=>{
    const {officeName,officeTypeId,regionType,parentOfficeId} = req.body;
    if(!officeName||!officeTypeId||!regionType){
        throw new ApiError(
            400,
            "Office name ,office type ID, region type are required")
    }

    if(officeName.trim()===""){
        throw new ApiError(
            400,
            "Office name cannot be empty")
    }

    if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
        throw new ApiError(
            400,
            "Office type ID is not valid")
    }

    if(parentOfficeId!==undefined){
        if(!mongoose.Types.ObjectId.isValid(parentOfficeId)){
            throw new ApiError(400,
                "Parent office ID is not valid")
        }
    }
    const allowedRegionTypes = ["Headquarter","Regional"]
    
    if(!allowedRegionTypes.includes(regionType)){
        throw new ApiError(
            400,
            "Region type must be either 'Headquarter' or 'Regional' ")
    }
    // DB validation 
    //1.check is there any officeName already exist in office model
    //2.chek parentOfficeId exist in office model
    //3.check officeTypeId exist in officeType model
    

    const existingOffice = await Office.findOne({
        officeName:officeName.trim(),
        isDeleted:false
    })

     if(existingOffice){
            throw new ApiError(
                409,
                "Office name already exists")
        }

    if(parentOfficeId!==undefined){
       const existingParentOffice = await Office.findOne({
            _id:parentOfficeId,
            isDeleted:false
        })

        if(!existingParentOffice){
        throw new ApiError(
            404,
            "Parent office not found")
    }
}  

    
        const existingOfficeType = await OfficeType.findOne({
            _id:officeTypeId,
            isDeleted:false
        })

        if(!existingOfficeType){
            throw new ApiError(404,
                "Office type ID not found")
        }
    

}

export const updateOfficeValidation = async(req)=>{
    const {officeId} = req.params;
    const {officeName
        ,parentOfficeId
        ,officeTypeId
        ,city
        ,regionType,
        isActive}=req.body

    if(Object.keys(req.body).length===0){
        throw new ApiError(
            400,
            "Can not update empty request body")
    }


    const allowedUpdates = ["officeName"
        ,"parentOfficeId"
        ,"officeTypeId"
        ,"city"
        ,"regionType"
        ,"isActive"]

    const officeKeys = Object.keys(req.body)
    
    const validUpdates=officeKeys.every((field)=>
        allowedUpdates.includes(field)
    )

    if(!validUpdates){
        throw new ApiError(400,
            "Cannot update this field")
    }

    
    if(officeName!==undefined){
        if(officeName.trim()===""){
            throw new ApiError(400,
                "Office name cannot be empty")
        }
    }

    if(parentOfficeId!==undefined){
        if(!mongoose.Types.ObjectId.isValid(parentOfficeId)){
            throw new ApiError(400,
                "Parent Office ID is not valid")
        }
    }

    if(officeTypeId!==undefined){
        if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
            throw new ApiError(400,
                "Office type ID is not valid")
        }
    }

    if(city!==undefined){
        if(city.trim()===""){
            throw new ApiError(400,
                "City cannot be empty")
        }
    }

    if(regionType!==undefined){
        const allowedRegionType = ["Headquarter","Regional"]

        if(!allowedRegionType.includes(regionType)){
            throw new ApiError(400,
                "Region type must be either 'Headquarter' or 'Regional' ")
        }
    }

    if(isActive!==undefined && typeof isActive !=="boolean"){
        throw new ApiError(400,
            "isActive must be either true or false")
    }

   

    if(!mongoose.Types.ObjectId.isValid(officeId)){
        throw new ApiError(400,
            "Office ID is not valid")
    }

    if(parentOfficeId!==undefined){
        if(parentOfficeId===officeId){
            throw new ApiError(400,
                "Office cannot be its own parent")
        }
    }

    //Db validation
    if(officeName!==undefined){
        const existingOffice = await Office.findOne({
            officeName:officeName.trim(),
            isDeleted:false,
            _id:{$ne:officeId}
        })

        if(existingOffice){
            throw new ApiError(409,
                "Office already exists")
        }
    }

    if(parentOfficeId!==undefined){
        const existingParentOffice = await Office.findOne({
            _id:parentOfficeId,
            isDeleted:false
        })

        if(!existingParentOffice){
            throw new ApiError(404,
                "parent office not found")
        }
    }

    if(officeTypeId!==undefined){
        const existingOfficeType = await OfficeType.findOne({
            _id:officeTypeId,
            isDeleted:false
        })

        if(!existingOfficeType){
            throw new ApiError(404,
                "Office type not found")
        }
    }

}

export const deleteOfficeValidation = async(req)=>{
    const {officeId} = req.params

    if(!mongoose.Types.ObjectId.isValid(officeId)){
        throw new ApiError(400,
            "Office ID is not valid")
    }

    const existingOffice = await Office.findOne({
        _id:officeId,
        isDeleted:false
    })

    if(!existingOffice){
        throw new ApiError(404,
            "Office not found")
    }

    //check wheather the childOffice exists or not 

    const existingChildOffice = await Office.findOne({
        parentOfficeId:officeId,
        isDeleted:false
    })

    if(existingChildOffice){
        throw new ApiError(409,
            "Cannot delete this office because child office exists")
    }
}


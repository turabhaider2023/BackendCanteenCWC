import mongoose from "mongoose";
import {Office} from "../models/office.js"
import {OfficeType} from "../models/officeType.js"

export const createOfficeValidation = async(req)=>{
    const {officeName,officeTypeId,regionType,parentOfficeId} = req.body;
    if(!officeName||!officeTypeId||!regionType){
        throw new Error("officeName,officeTypeId,regionType are required")
    }

    if(officeName.trim()===""){
        throw new Error("officeName is empty")
    }

    if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
        throw new Error("officeTypeId is not valid")
    }

    if(parentOfficeId!==undefined){
        if(!mongoose.Types.ObjectId.isValid(parentOfficeId)){
            throw new Error("parentofficeId is not valid")
        }
    }
    const allowedRegionTypes = ["Headquarter","Regional"]
    
    if(!allowedRegionTypes.includes(regionType)){
        throw new Error("regionType must be Headquarter or Regional")
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
            throw new Error("officeName already exists")
        }

    if(parentOfficeId!==undefined){
       const existingParentOffice = await Office.findOne({
            _id:parentOfficeId,
            isDeleted:false
        })

        if(!existingParentOffice){
        throw new Error("parent office does not exist")
    }
}  

    
        const existingOfficeType = await OfficeType.findOne({
            _id:officeTypeId,
            isDeleted:false
        })

        if(!existingOfficeType){
            throw new Error("officeTypeId does not exist ")
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
        throw new Error("can not update empty body")
    }

    if(officeName!==undefined){
        if(officeName.trim()===""){
            throw new Error("officeName is empty")
        }
    }

    if(parentOfficeId!==undefined){
        if(!mongoose.Types.ObjectId.isValid(parentOfficeId)){
            throw new Error("parentOfficeId is not valid")
        }
    }

    if(officeTypeId!==undefined){
        if(!mongoose.Types.ObjectId.isValid(officeTypeId)){
            throw new Error("officeTypeId is not valid")
        }
    }

    if(city!==undefined){
        if(city.trim()===""){
            throw new Error("city is empty")
        }
    }

    if(regionType!==undefined){
        const allowedRegionType = ["Headquarter","Regional"]

        if(!allowedRegionType.includes(regionType)){
            throw new Error("RegionType must be Headquarter or Regional")
        }
    }

    const allowedUpdates = ["officeName"
        ,"parentOfficeId"
        ,"officeTypeId"
        ,"city"
        ,"regionType"
        ,"isActive"]

    const officeKeys = Object.keys(req.body)
    
    const validUpdates=officeKeys.every((feild)=>
        allowedUpdates.includes(feild)
    )

    if(!validUpdates){
        throw new Error("can not update this field")
    }

    if(isActive!==undefined && typeof isActive !=="boolean"){
        throw new Error("isActive must be true or false")
    }

    //DB validations

    if(!mongoose.Types.ObjectId.isValid(officeId)){
        throw new Error("officeId is not valid")
    }

    if(parentOfficeId!==undefined){
        if(parentOfficeId===officeId){
            throw new Error("office can not be its own parent")
        }
    }

    if(officeName!==undefined){
        const existingOffice = await Office.findOne({
            officeName:officeName.trim(),
            isDeleted:false,
            _id:{$ne:officeId}
        })

        if(existingOffice){
            throw new Error("office already exists")
        }
    }

    if(parentOfficeId!==undefined){
        const existingParentOffice = await Office.findOne({
            _id:parentOfficeId,
            isDeleted:false
        })

        if(!existingParentOffice){
            throw new Error("parent office does not exist")
        }
    }

    if(officeTypeId!==undefined){
        const existingofficeType = await OfficeType.findOne({
            _id:officeTypeId,
            isDeleted:false
        })

        if(!existingofficeType){
            throw new Error("this office type does not exist")
        }
    }

}

export const deleteOfficeValidation = async(req)=>{
    const {officeId} = req.params

    if(!mongoose.Types.ObjectId.isValid(officeId)){
        throw new Error("officeId is not valid")
    }

    const existingOffice = await Office.findOne({
        _id:officeId,
        isDeleted:false
    })

    if(!existingOffice){
        throw new Error("office does not exist")
    }

    //check wheather the childOffice exists or not 

    const existingChildOffice = await Office.findOne({
        parentOfficeId:officeId,
        isDeleted:false
    })

    if(existingChildOffice){
        throw new Error("can not delete this office because child office exist")
    }
}


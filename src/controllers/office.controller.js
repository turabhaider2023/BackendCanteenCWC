import {createOfficeValidation
    ,updateOfficeValidation,
    deleteOfficeValidation
} from "../validations/office.validation.js"
import { Office } from "../models/office.js"

export const createOffice = async(req,res)=>{
    try {
        await createOfficeValidation(req)
        const {officeName,parentOfficeId,officeTypeId,city,regionType} =req.body

        const officeData = {
            officeName:officeName.trim(),
            officeTypeId,
            regionType
        }

        if(city!==undefined){
            officeData.city=city.trim()
        }

        if(parentOfficeId!==undefined){
            officeData.parentOfficeId=parentOfficeId;
        }

        const newOffice = await Office.create(officeData)

        return res.status(201).json({
            message:"office created successfully",
            data:newOffice
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in creating the office",
            error:error.message
        })
        
    }
}

export const getAllOffices = async(req,res)=>{
    try {
        const allOffices = await Office
        .find({
            isDeleted:false
        })
        .sort({officeName:1})

        return res.status(200).json({
            message:"all offices fetched successfully",
            data:allOffices
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in the fetching the offices",
            error:error.message
        })
    }
}

export const updateOffice = async(req,res)=>{
    try {

        await updateOfficeValidation(req)
        const {officeId} = req.params
        const {officeName
            , parentOfficeId
            ,officeTypeId
            ,city
            ,regionType
            ,isActive} = req.body

    const updateData = {}

    if(officeName!==undefined){
        updateData.officeName=officeName.trim()

    }

    if(parentOfficeId!==undefined){
        updateData.parentOfficeId=parentOfficeId
    }

    if(officeTypeId!==undefined){
        updateData.officeTypeId=officeTypeId
    }

    if(city!==undefined){
        updateData.city=city.trim()
    }

    if(regionType!==undefined){
        updateData.regionType=regionType;
    }

    if(isActive!==undefined){
        updateData.isActive=isActive
    }
     
    const updatedOffice = await Office.findByIdAndUpdate(
        officeId,
        updateData,
        {returnDocument:"after"}
    )
    return res.status(200).json({
        message:"office updated successfully",
        data:updatedOffice,
       
    })
    } catch (error) {
        return res.status(400).json({
            message:"error in updating office",
            erro:error.message
        })
        
    }
}

export const deleteOffice = async(req,res)=>{
    try {
        await deleteOfficeValidation(req)
        const {officeId} = req.params
        
        const deletedOffice = await Office.findByIdAndUpdate(
            officeId,
            {isDeleted:true,
             isActive:false
            },
            {returnDocument:"after"}
        )

        return res.status(200).json({
            message:"office deleted successfully",
            data:deletedOffice
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in deleting the office",
            error:error.message
        })
        
    }
}
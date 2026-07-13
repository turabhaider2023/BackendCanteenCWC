import {Role} from "../models/role.js"
import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"


export const createRoleValidation = async(req)=>{
    const {roleName} = req.body

    if(!roleName){
        throw new ApiError(
            400,
            "Role name is required")
    }

    if(typeof roleName !=="string"){
        throw new ApiError(400,
            "Role name must be a string")
    }

    if(roleName.trim()===""){
        throw new ApiError(400,
            "Role name cannot be empty")
    }

    const existingRole = await Role.findOne({
        roleName:roleName.trim(),
        isDeleted:false
    })

    if(existingRole){
        throw new ApiError(409,
            "Role already exists")
    }
}

export const updateRoleValidation = async(req)=>{
   const {roleId} = req.params
   const {roleName,isActive} = req.body

   if(Object.keys(req.body).length===0){
    throw new ApiError(400,
        "Cannot update an empty request body")
   }

   if(roleName!==undefined){

        if(typeof roleName !=="string"){
            throw new ApiError(400,
                "Role name must be a string")
        }

        if(roleName.trim()==="" ){
            throw new ApiError(400,
                "Role name cannot be empty")
        }

        
   }

   if(isActive!==undefined && typeof isActive !=="boolean"){
        throw new ApiError(400,
            "isActive must be either true or false")
   }

   const allowedUpdates = ["roleName","isActive"]

   const roleKeys = Object.keys(req.body)

   const validRoles =roleKeys.every(field=>
    allowedUpdates.includes(field)
   )

   if(!validRoles){
    throw new ApiError(400,
        "updating this role is not allowed")
   }

   if(!mongoose.Types.ObjectId.isValid(roleId)){
    throw new ApiError(400,
        "Role ID is not valid")
   }

   const existingRoleById = await Role.findOne({
    _id: roleId,
    isDeleted: false
});

    if (!existingRoleById) {
        throw new ApiError(404,
            "Role not found");
    }

   if(roleName!==undefined){
        const existingRole = await Role.findOne({
            roleName:roleName.trim(),
            isDeleted:false,
            _id:{$ne:roleId}
        })

        if(existingRole){
            throw new ApiError(409,
                "Role already exists")
        }

}}

export const deleteRoleValidation = async(req)=>{
        const {roleId}=req.params

        if(!mongoose.Types.ObjectId.isValid(roleId)){
            throw new ApiError(400,
                "Role ID is not valid")
        }

        const existingRole = await Role.findOne({
            _id:roleId,
            isDeleted:false
        })

        if(!existingRole){
            throw new ApiError(404,
                "Role not found")
        }
}
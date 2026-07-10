import {Role} from "../models/role.js"
import mongoose from "mongoose"


export const createRoleValidation = async(req)=>{
    const {roleName} = req.body

    if(!roleName){
        throw new Error("roleName is required")
    }

    if(typeof roleName !=="string"){
        throw new Error("roleName must be a string")
    }

    if(roleName.trim()===""){
        throw new Error("roleName can not be empty")
    }

    const existingRole = await Role.findOne({
        roleName:roleName.trim(),
        isDeleted:false
    })

    if(existingRole){
        throw new Error("role already exists")
    }
}

export const updateRoleValidation = async(req)=>{
   const {roleId} = req.params
   const {roleName,isActive} = req.body

   if(Object.keys(req.body).length===0){
    throw new Error("can not update empty object")
   }

   if(roleName!==undefined){

        if(typeof roleName !=="string"){
            throw new Error("roleName must be a string")
        }

        if(roleName.trim()==="" ){
            throw new Error("roleName can not be empty")
        }

        
   }

   if(isActive!==undefined && typeof isActive !=="boolean"){
        throw new Error("isActive must be only true or false")
   }

   const allowedUpdates = ["roleName","isActive"]

   const roleKeys = Object.keys(req.body)

   const validRoles =roleKeys.every(field=>
    allowedUpdates.includes(field)
   )

   if(!validRoles){
    throw new Error("this role is not allowed to update")
   }

   if(!mongoose.Types.ObjectId.isValid(roleId)){
    throw new Error("roleId is not valid")
   }

   const existingRoleById = await Role.findOne({
    _id: roleId,
    isDeleted: false
});

    if (!existingRoleById) {
        throw new Error("role not found");
    }

   if(roleName!==undefined){
        const existingRole = await Role.findOne({
            roleName:roleName.trim(),
            isDeleted:false,
            _id:{$ne:roleId}
        })

        if(existingRole){
            throw new Error("role already exists")
        }

}}

export const deleteRoleValidation = async(req)=>{
        const {roleId}=req.params

        if(!mongoose.Types.ObjectId.isValid(roleId)){
            throw new Error("roleId is not valid")
        }

        const existingRole = await Role.findOne({
            _id:roleId,
            isDeleted:false
        })

        if(!existingRole){
            throw new Error("role does not exist")
        }
}
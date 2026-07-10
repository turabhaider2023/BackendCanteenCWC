import {createRoleValidation
    ,updateRoleValidation
    ,deleteRoleValidation
} from "../validations/role.validation.js"
import {Role} from "../models/role.js"


export const createRole = async(req,res)=>{
    try {
        await createRoleValidation(req)

        const {roleName} = req.body

        const data = {
            roleName:roleName.trim()
        }

        const newRole = await Role.create(data)

        return res.status(201).json({
            message:"role created successfully",
            data:newRole
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in creating the role",
            error:error.message
        })
    }
}

export const getAllRoles = async(req,res)=>{
    try {
        const allRoles = await Role
        .find({
            isDeleted:false
        })
        .sort({roleName:1})

        return res.status(200).json({
            message:"all roles fetched successfully",
            data:allRoles
        })
    } catch (error) {
        return res.status(500).json({
            message:"error in fetching the roles",
            error:error.message
        })
        
    }
}

export const updateRole = async(req,res)=>{
    try {
        await updateRoleValidation(req)
        const {roleId}=req.params
        const {roleName,isActive} = req.body

        const updateData = {}

        if(roleName!==undefined){
            updateData.roleName=roleName.trim()

        }

        if(isActive!==undefined){
            updateData.isActive=isActive
        }

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            updateData,
            {returnDocument:"after"}

        )

        return res.status(200).json({
            message:"role updated successfully",
            data:updatedRole
        })
    } catch (error) {
        return res.status(500).json({
            message:"error in updating role",
            error:error.message
        })
    }
}

export const deleteRole = async(req,res)=>{
    try {
        await deleteRoleValidation(req)
        const {roleId} = req.params

        const deletedRole = await Role.findByIdAndUpdate(
            roleId,
            {isDeleted:true,
             isActive:false
            },
            {returnDocument:"after"}

        )

        return res.status(200).json({
            message:"role deleted successfully",
            data:deletedRole
        })
    } catch (error) {
        return res.status(500).json({
            message:"error in deleting the role",
            error:error.message
        })
        
    }
}
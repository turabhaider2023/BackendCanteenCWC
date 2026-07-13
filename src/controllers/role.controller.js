import {createRoleValidation
    ,updateRoleValidation
    ,deleteRoleValidation
} from "../validations/role.validation.js"
import {Role} from "../models/role.js"
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


export const createRole = asyncHandler(async(req,res)=>{
        await createRoleValidation(req)

        const {roleName} = req.body

        const data = {
            roleName:roleName.trim()
        }

        const newRole = await Role.create(data)

        return res.status(201).json(
           new ApiResponse(
            201,
            newRole,
            "Role created successfully"

           ))
    
    
})

export const getAllRoles = asyncHandler(async(req,res)=>{
        const allRoles = await Role
        .find({
            isDeleted:false
        })
        .sort({roleName:1})

        return res.status(200).json(
            new ApiResponse(
                200,
                allRoles,
                "All roles fetched successfully"

            )
        )
       
   
})

export const updateRole = asyncHandler(async(req,res)=>{
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

        return res.status(200).json(
          new ApiResponse(
            200,
            updatedRole,
            "Role updated successfully"

          )
        )
    })

export const deleteRole = asyncHandler(async(req,res)=>{
        await deleteRoleValidation(req)
        const {roleId} = req.params

        const deletedRole = await Role.findByIdAndUpdate(
            roleId,
            {isDeleted:true,
             isActive:false
            },
            {returnDocument:"after"}

        )

        return res.status(200).json(
            new ApiResponse(
                200,
                deletedRole,
                "Role soft deleted successfully"

            )
       )
  
})
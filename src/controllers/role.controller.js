import {createRoleService,
    getAllRolesService,
    updateRoleService,
    deleteRoleService
} from "../services/role.service.js"
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


export const createRole = asyncHandler(async(req,res)=>{
       const newRole = await createRoleService(req.body)

        return res.status(201).json(
           new ApiResponse(
            201,
            newRole,
            "Role created successfully"

           ))
    
    
})

export const getAllRoles = asyncHandler(async(req,res)=>{
        const allRoles = await getAllRolesService()

        return res.status(200).json(
            new ApiResponse(
                200,
                allRoles,
                "All roles fetched successfully"

            )
        )
       
   
})

export const updateRole = asyncHandler(async(req,res)=>{
   const updatedRole = await updateRoleService({
    roleId:req.params.roleId,
    ...req.body
   })
        return res.status(200).json(
          new ApiResponse(
            200,
            updatedRole,
            "Role updated successfully"

          )
        )
    })

export const deleteRole = asyncHandler(async(req,res)=>{
    const deletedRole = await deleteRoleService(req.params)
        return res.status(200).json(
            new ApiResponse(
                200,
                deletedRole,
                "Role soft deleted successfully"

            )
       )
  
})
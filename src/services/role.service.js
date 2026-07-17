import { Role } from "../models/role.js";
import ApiError from "../utils/ApiError.js";

export const createRoleService = async (data)=>{
    const {roleName} = data

    const existingRole = await Role.findOne({
        roleName,
        isDeleted:false
    })

    if(existingRole){
        throw new ApiError(
            409,
            "Role already exists"
        )
    }

    try {
        const newRole = await Role.create({
            roleName
        }
        )

        return newRole
    } catch (error) {
        if(error.code===11000){
            throw new ApiError(
                409,
                "Role already exists"
            )
        }

        throw error
    }
}

export const getAllRolesService = async ()=>{
    const allRoles = await Role
    .find({
        isDeleted:false
    })
    .sort({roleName:1})

    

    return allRoles;
}

export const updateRoleService = async (data)=>{

    const {roleId,roleName,isActive} = data
    const existingRole = await Role.findOne({
        _id:roleId,
        isDeleted:false

    })

    if(!existingRole){
        throw new ApiError(
            404,
            "Role not found"
        )
    }

    if(roleName!==undefined){
           const duplicateRole = await Role.findOne({
        roleName,
        isDeleted:false,
        _id:{$ne:roleId}
    })

    if(duplicateRole){
        throw new ApiError(
            409,
            "Role already exists"
        )
    }
    }

    const updatedData = {}

    if(roleName!==undefined){
        updatedData.roleName=roleName
    }

    if(isActive!==undefined){
        updatedData.isActive=isActive
    }

  try {
      const updatedRole = await Role.findByIdAndUpdate(
        roleId,
        updatedData,
        {returnDocument:"after",
        runValidators:true
        }
    )

    return updatedRole
  } catch (error) {
     if(error.code ===11000){
        throw new ApiError(
            409,
            "Role already exists"
        )
     }

     throw error;
  }
}

export const deleteRoleService = async(data)=>{
    const {roleId} = data

    const existingRole = await Role.findOne({
        _id:roleId,
        isDeleted:false
    })

    if(!existingRole){
        throw new ApiError(
            404,
            "Role not found"
        )
    }

    const deletedRole = await Role.findByIdAndUpdate(
        roleId,
        {
            isDeleted:true,
            isActive:false
        },
        {returnDocument:"after"}
    )

    return deletedRole
}
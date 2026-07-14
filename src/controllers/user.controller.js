import {createUserValidation
    ,updateUserValidation
    ,deleteUserValidation
} from "../validations/user.validation.js";
import {User} from "../models/user.js";
import { Role } from "../models/role.js";
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";


import mongoose from "mongoose";

export const createUser = asyncHandler(async(req,res)=>{
        await createUserValidation(req)

        const {name,officialEmail,mobileNumber,designationId,officeId,roles}=req.body

        const data = {
            name:name.trim(),
            officialEmail:officialEmail.trim().toLowerCase(),
            mobileNumber:mobileNumber.trim(),
            designationId,
            officeId
        }


           if (roles !== undefined) {
            data.roles = roles;
        } else {
            const defaultUserRole = await Role.findOne({
                roleName: "User",
                isDeleted: false
            });

            data.roles = [defaultUserRole._id];
        }

        const newUser = await User.create(data)
        return res.status(201).json(
            new ApiResponse(
                201,
                newUser,
                "User created successfully"

            ))
        
    
})

export const getAllUsers = asyncHandler(async(req,res)=>{
         const allUsers = await User.find({
            isDeleted:false
         })
         .populate("designationId")
         .populate("officeId")
         .populate("roles")
         .sort({name:1})

         return res.status(200).json(
            new ApiResponse(
                200,
                allUsers,
                "All users fetched successfully"

            ))
            
})

export const getUserById = asyncHandler(async(req,res)=>{
        const {userId} = req.params
        if (!mongoose.Types.ObjectId.isValid(userId)) {
       throw new ApiError(400,
        "User ID is not valid");
}

        const user = await User.findOne({
            _id:userId,
            isDeleted:false
        })
        .populate("designationId")
         .populate("officeId")
         .populate("roles")
        
         if(!user){
            throw new ApiError(
                404,
                "user not found"
            )
         }

         return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "User fetched successfully"

            )
         )
        
   
})

export const updateUser = asyncHandler(async(req,res)=>{
        await updateUserValidation(req)

        const { userId } = req.params
        const {
            name,
            officialEmail,
            mobileNumber,
            designationId,
            officeId,
            roles,
            isActive
        } = req.body

        const updateData = {}

        if(name !== undefined){
            updateData.name = name.trim()
        }

        if(officialEmail !== undefined){
            updateData.officialEmail = officialEmail.trim().toLowerCase()
        }

        if(mobileNumber !== undefined){
            updateData.mobileNumber = mobileNumber.trim()
        }

        if(designationId !== undefined){
            updateData.designationId = designationId
        }

        if(officeId !== undefined){
            updateData.officeId = officeId
        }

        if(roles !== undefined){
            updateData.roles = roles
        }

        if(isActive !== undefined){
            updateData.isActive = isActive
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { returnDocument: "after" }
        )
        .populate("designationId")
        .populate("officeId")
        .populate("roles")

        return res.status(200).json(
            new ApiResponse(
                200,
            updatedUser,
            "User updated successfully")

        )
    
})

export const deleteUser = asyncHandler(async(req,res)=>{
        await deleteUserValidation(req)

        const { userId } = req.params

        const deletedUser = await User.findByIdAndUpdate(
            userId,
            {
                isDeleted: true,
                isActive: false
            },
            { returnDocument: "after" }
        )

        return res.status(200).json(
           new ApiResponse(
             200,
            deletedUser,
            "User deleted successfully"

           )
      )
   
})
import {createUserValidation
    ,updateUserValidation
    ,deleteUserValidation
} from "../validations/user.validation.js";
import {User} from "../models/user.js";
import { Role } from "../models/role.js";

import mongoose from "mongoose";

export const createUser = async(req,res)=>{
    try {
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
        return res.status(201).json({
            message:"user created successfully",
            data:newUser
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in creating the user",
            error:error.message
        })
        
    }
}

export const getAllUsers = async(req,res)=>{
    try {
         const allUsers = await User.find({
            isDeleted:false
         })
         .populate("designationId")
         .populate("officeId")
         .populate("roles")
         .sort({name:1})

         return res.status(200).json({
            message:"users fetched successfully",
            data:allUsers
         })
    } catch (error) {
        return res.status(500).json({
            message:"error in fetching users",
            error:error.message
        })
        
    }
}

export const getUserById = async(req,res)=>{
    try {
        const {userId} = req.params
        if (!mongoose.Types.ObjectId.isValid(userId)) {
       throw new Error("userId is not valid");
}

        const user = await User.findOne({
            _id:userId,
            isDeleted:false
        })
        .populate("designationId")
         .populate("officeId")
         .populate("roles")
        
         if(!user){
            return res.status(404).json({
                message:"user does not exist"
            })
         }

         return res.status(200).json({
            message:"successfully fetched the user",
            data:user
         })
    } catch (error) {
        return res.status(500).json({
            message:"error in fetching the user",
            error:error.message
        })
    }
}

export const updateUser = async(req,res)=>{
    try {
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

        return res.status(200).json({
            message:"user updated successfully",
            data:updatedUser
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in updating user",
            error:error.message
        })
    }
}

export const deleteUser = async(req,res)=>{
    try {
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

        return res.status(200).json({
            message:"user deleted successfully",
            data:deletedUser
        })
    } catch (error) {
        return res.status(400).json({
            message:"error in deleting user",
            error:error.message
        })
    }
}
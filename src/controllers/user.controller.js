import {createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from "../services/user.service.js"

import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";


export const createUser = asyncHandler(async(req,res)=>{
       
    const newUser = await createUserService(req.body)

        return res.status(201).json(
            new ApiResponse(
                201,
                newUser,
                "User created successfully"

            ))
        
    
})

export const getAllUsers = asyncHandler(async(req,res)=>{
        
        const allUsers = await getAllUsersService()

         return res.status(200).json(
            new ApiResponse(
                200,
                allUsers,
                "All users fetched successfully"

            ))
            
})

export const getUserById = asyncHandler(async(req,res)=>{

    const user = await getUserByIdService(req.params)

         return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "User fetched successfully"

            )
         )
        
   
})

export const updateUser = asyncHandler(async(req,res)=>{
        
       const updatedUser = await updateUserService({
        userId:req.params.userId,
        ...req.body
       })
        

        return res.status(200).json(
            new ApiResponse(
                200,
            updatedUser,
            "User updated successfully")

        )
    
})

export const deleteUser = asyncHandler(async(req,res)=>{
        
    const deletedUser  = await deleteUserService(req.params)

        return res.status(200).json(
           new ApiResponse(
             200,
            deletedUser,
            "User deleted successfully"

           )
      )
   
})
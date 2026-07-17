import { User } from "../models/user.js"
import ApiError from "../utils/ApiError.js"
import {Designation} from "../models/designation.js"
import {Office} from "../models/office.js"
import {Role} from "../models/role.js"

export const createUserService = async (data)=>{
    const {name,officialEmail,mobileNumber,designationId,officeId,roles} = data

    const existingUserByEmail = await User.findOne({
        officialEmail,
        isDeleted:false
    })

    if(existingUserByEmail){
        throw new ApiError(
            409,
            "User already exists"
        )
    }

    const existingUserByMobile = await User.findOne({
        mobileNumber,
        isDeleted:false
    })

    if(existingUserByMobile){
        throw new ApiError(
            409,
            "User already exists"
        )
    }

    const existingDesignation = await Designation.findOne({
        _id:designationId,
        isDeleted:false
    })

    if(!existingDesignation){
        throw new ApiError(
            404,
            "Designation not found"
        )
    }

    const existingOffice = await Office.findOne({
        _id:officeId,
        isDeleted:false
    })

    if(!existingOffice){
        throw new ApiError(
            404,
            "Office not found"
        )
    }


// businees rule 
let assignedRoles;

if (roles !== undefined) {

    const existingRoles = await Role.find({
        _id: { $in: roles },
        isDeleted: false
    });

    if (existingRoles.length !== roles.length) {
        throw new ApiError(
            404,
            "One or more roles not found"
        );
    }

    assignedRoles = roles;
}

else {

    const defaultRole = await Role.findOne({
        roleName: "User",
        isDeleted: false
    });

    if (!defaultRole) {
        throw new ApiError(
            500,
            "Default User role is not configured"
        );
    }

    assignedRoles = [defaultRole._id];
}


try {
    const newUser = await User.create({
        name,
        officialEmail,
        mobileNumber,
        designationId,
        officeId,
        roles:assignedRoles
        
    })

    return newUser
} catch (error) {
    if(error.code===11000){
        throw new ApiError(
            409,
            "User already exists"
        )
    }

    throw error
}}

export const getAllUsersService = async ()=>{
    const allUsers = await User.find({
        isDeleted:false
    })
    .sort({name:1})
    .populate("designationId", "designationName")
    .populate("officeId", "officeName")
    .populate("roles", "roleName")

    return allUsers
}

export const getUserByIdService = async (data)=>{
    const { userId } =data

    const user = await User.findOne({
        _id:userId,
        isDeleted:false
    })
    .populate("designationId", "designationName")
    .populate("officeId", "officeName")
    .populate("roles", "roleName")

    if(!user){
        throw new ApiError(
            404,
            "User not found"
        )
    }

    return user;
}

export const updateUserService = async (data) => {
    const {
        userId,
        name,
        officialEmail,
        mobileNumber,
        designationId,
        officeId,
        roles,
        isActive
    } = data;

    const existingUser = await User.findOne({
        _id: userId,
        isDeleted: false
    });

    if (!existingUser) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    if (officialEmail !== undefined) {
        const existingUserByEmail = await User.findOne({
            officialEmail,
            isDeleted: false,
            _id: { $ne: userId }
        });

        if (existingUserByEmail) {
            throw new ApiError(
                409,
                "Email already registered"
            );
        }
    }

    if (mobileNumber !== undefined) {
        const existingUserByMobile = await User.findOne({
            mobileNumber,
            isDeleted: false,
            _id: { $ne: userId }
        });

        if (existingUserByMobile) {
            throw new ApiError(
                409,
                "Mobile number already registered"
            );
        }
    }

    if (designationId !== undefined) {
        const existingDesignation = await Designation.findOne({
            _id: designationId,
            isDeleted: false
        });

        if (!existingDesignation) {
            throw new ApiError(
                404,
                "Designation not found"
            );
        }
    }

    if (officeId !== undefined) {
        const existingOffice = await Office.findOne({
            _id: officeId,
            isDeleted: false
        });

        if (!existingOffice) {
            throw new ApiError(
                404,
                "Office not found"
            );
        }
    }

    if (roles !== undefined) {
        const existingRoles = await Role.find({
            _id: { $in: roles },
            isDeleted: false
        });

        if (existingRoles.length !== roles.length) {
            throw new ApiError(
                404,
                "One or more roles not found"
            );
        }
    }

    const updatedData = {};

    if (name !== undefined) {
        updatedData.name = name;
    }

    if (officialEmail !== undefined) {
        updatedData.officialEmail = officialEmail;
    }

    if (mobileNumber !== undefined) {
        updatedData.mobileNumber = mobileNumber;
    }

    if (designationId !== undefined) {
        updatedData.designationId = designationId;
    }

    if (officeId !== undefined) {
        updatedData.officeId = officeId;
    }

    if (roles !== undefined) {
        updatedData.roles = roles;
    }

    if (isActive !== undefined) {
        updatedData.isActive = isActive;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return updatedUser;

    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "User already exists"
            );
        }

        throw error;
    }
};

export const deleteUserService = async (data)=>{
    const {userId} = data

    const existingUser = await User.findOne({
        _id:userId,
        isDeleted:false
    })

    if(!existingUser){
        throw new ApiError(
            404,
            "User not found"
        )
    }

    const deletedUser = await User.findByIdAndUpdate(
        userId,{
            isDeleted:true,
            isActive:false
        },
        {returnDocument:"after"}
    )

    return deletedUser
}
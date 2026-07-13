import {User} from "../models/user.js"
import { Designation } from "../models/designation.js";
import { Office } from "../models/office.js";
import { Role } from "../models/role.js";
import mongoose from "mongoose";
import validator from "validator";
import ApiError from "../utils/ApiError.js"

export const createUserValidation = async(req)=>{
    const {
        name,
        officialEmail,
        mobileNumber,
        designationId,
        officeId,
        roles,
        isActive
    } = req.body

   
    if(!name||!officialEmail|| !mobileNumber ||!designationId||!officeId){
        throw new 
        ApiError(400,
            "Name, official Email, mobileNumber, designation ID and office ID are required")
    }

    if(typeof name !=="string"){
        throw new ApiError(400,
            "Name must be a string ")
    }
    if(name.trim()===""){
        throw new ApiError(400,
            "Name cannot be empty")
    }
     
    if(typeof officialEmail !=="string"){
        throw new ApiError(400,
            "Email must be a string")
    }
    if(officialEmail.trim()===""){
        throw new ApiError(400,
            "Email cannot be empty")
    }

    if(!validator.isEmail(officialEmail.trim())){
        throw new ApiError(400,
            "Email is invalid")
    }

    if(typeof mobileNumber!=="string"){
        throw new ApiError(400,
            "Mobile number must be a string")
    }
    if(mobileNumber.trim()===""){
        throw new ApiError(400,
            "Mobile number cannot be empty")
    }

    if(!validator.isMobilePhone(mobileNumber.trim(),"en-IN")||
    mobileNumber.trim().length!==10){
        throw new ApiError(400,
            "Mobile number must be a 10 digit Indian mobile number")
    }

    if(!mongoose.Types.ObjectId.isValid(designationId)){
        throw new ApiError(400,
            "Designation ID is not valid")
    }

    if(!mongoose.Types.ObjectId.isValid(officeId)){
        throw new ApiError(400,
            "Office Id is not valid")
    }

    if(roles!==undefined){
        if(!Array.isArray(roles)){
            throw new ApiError(400,
                "roles must be an array")
        }

        if(roles.length===0){
            throw new ApiError(400,
                "Role array cannot be empty")
        }

        const allRolesIdsValid = roles.every((roleId)=>
            mongoose.Types.ObjectId.isValid(roleId)
        )

        if(!allRolesIdsValid){
            throw new ApiError(400,
                "One or more role IDs are not valid")
        }

        
    }

   
    //DB validations

    const existingUserByEmail = await User.findOne({
        officialEmail:officialEmail.trim().toLowerCase(),
        isDeleted:false
    })

    if(existingUserByEmail){
        throw new ApiError(409,
            "User already exists")
    }

    const existingUserByMobile = await User.findOne({
        mobileNumber:mobileNumber.trim(),
        isDeleted:false
    })

    if(existingUserByMobile){
        throw new ApiError(409,
            "User already exist")
    }

    const existingDesignation = await Designation.findOne({
        _id:designationId,
        isDeleted:false
    })

    if(!existingDesignation){
        throw new ApiError(404,
            "Designation not found")
    }

    const exisitingOfficeId = await Office.findOne({
        _id:officeId,
        isDeleted:false
    })

    if(!exisitingOfficeId){
        throw new ApiError(404,"office not found")
    }

    //Request validation me tumne roleIds ka format check kar liya — good.
    //But DB me actual role exist bhi karta hai ya nahi, wo abhi missing hai.

    if (roles !== undefined) {
    const existingRoles = await Role.find({
        _id: { $in: roles },
        isDeleted: false
    });

    if (existingRoles.length !== roles.length) {
        throw new ApiError(404,
            "One or more roles not found");
    }

    
}
    else {
    const defaultUserRole = await Role.findOne({
        roleName: "User",
        isDeleted: false
    });

    if (!defaultUserRole) {
        throw new ApiError(404,
            "Default role 'User' not found");
    }
}



}

export const updateUserValidation = async (req) => {
    const { userId } = req.params;
    const {
        name,
        officialEmail,
        mobileNumber,
        designationId,
        officeId,
        roles,
        isActive
    } = req.body;

    // =========================
    // 1. REQUEST DATA VALIDATIONS
    // =========================

    if (Object.keys(req.body).length === 0) {
        throw new ApiError(400,
            "Cannot update empty object");
    }

    const allowedUpdates = [
        "name",
        "officialEmail",
        "mobileNumber",
        "designationId",
        "officeId",
        "roles",
        "isActive"
    ];

    const userKeys = Object.keys(req.body);

    const isValidUpdate = userKeys.every((field) =>
        allowedUpdates.includes(field)
    );

    if (!isValidUpdate) {
        throw new ApiError(400,
            "This field is not allowed to update");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400,
            "User ID is not valid");
    }

    if (name !== undefined) {
        if (typeof name !== "string") {
            throw new ApiError(400,
                "name must be a string");
        }

        if (name.trim() === "") {
            throw new ApiError(400,
                "Name cannot be empty");
        }
    }

    if (officialEmail !== undefined) {
        if (typeof officialEmail !== "string") {
            throw new ApiError(400,
                "Official Email must be a string");
        }

        if (officialEmail.trim() === "") {
            throw new ApiError(400,
                "Official Email cannot be empty");
        }

        if (!validator.isEmail(officialEmail.trim())) {
            throw new ApiError(400,
                "Official Email is invalid");
        }
    }

    if (mobileNumber !== undefined) {
        if (typeof mobileNumber !== "string") {
            throw new ApiError(400,
                "Mobile Number must be a string");
        }

        if (mobileNumber.trim() === "") {
            throw new ApiError(
                400,
                "mobile Number cannot be empty");
        }

        if (
            !validator.isMobilePhone(mobileNumber.trim(), "en-IN") ||
            mobileNumber.trim().length !== 10
        ) {
            throw new ApiError(400,
                "Mobile Number must be a 10 digit Indian mobile number");
        }
    }

    if (designationId !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(designationId)) {
            throw new ApiError(400,
                "Designation ID is not valid");
        }
    }

    if (officeId !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(officeId)) {
            throw new ApiError(400,
                "Office ID is not valid");
        }
    }

    if (roles !== undefined) {
        if (!Array.isArray(roles)) {
            throw new ApiError(400,
                "Roles must be an array");
        }

        if (roles.length === 0) {
            throw new ApiError(400,
                "Roles array cannot be empty");
        }

        const allRolesIdsValid = roles.every((roleId) =>
            mongoose.Types.ObjectId.isValid(roleId)
        );

        if (!allRolesIdsValid) {
            throw new ApiError(400,
                "One or more role IDs are not valid");
        }
    }

    if (isActive !== undefined && typeof isActive !== "boolean") {
        throw new ApiError(400,
            "isActive must be either true or false");
    }

    // =========================
    // 2. DATABASE VALIDATIONS
    // =========================

    const existingUser = await User.findOne({
        _id: userId,
        isDeleted: false
    });

    if (!existingUser) {
        throw new ApiError(404,
            "User not found");
    }

    if (officialEmail !== undefined) {
        const existingUserByEmail = await User.findOne({
            officialEmail: officialEmail.trim().toLowerCase(),
            isDeleted: false,
            _id: { $ne: userId }
        });

        if (existingUserByEmail) {
            throw new ApiError(409,
                "Official Email already exists");
        }
    }

    if (mobileNumber !== undefined) {
        const existingUserByMobile = await User.findOne({
            mobileNumber: mobileNumber.trim(),
            isDeleted: false,
            _id: { $ne: userId }
        });

        if (existingUserByMobile) {
            throw new ApiError(409,
                "Mobile Number already exists");
        }
    }

    if (designationId !== undefined) {
        const existingDesignation = await Designation.findOne({
            _id: designationId,
            isDeleted: false
        });

        if (!existingDesignation) {
            throw new ApiError(404,
                "Designation not found");
        }
    }

    if (officeId !== undefined) {
        const existingOffice = await Office.findOne({
            _id: officeId,
            isDeleted: false
        });

        if (!existingOffice) {
            throw new ApiError(404,
                "Office not found");
        }
    }

    if (roles !== undefined) {
        const existingRoles = await Role.find({
            _id: { $in: roles },
            isDeleted: false
        });

        if (existingRoles.length !== roles.length) {
            throw new ApiError(404,
                "One or more roles not found");
        }
    }
};

export const deleteUserValidation = async(req)=>{
    const { userId } = req.params

    // =========================
    // 1. REQUEST DATA VALIDATIONS
    // =========================
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400,
            "User ID is not valid")
    }

    // =========================
    // 2. DATABASE VALIDATIONS
    // =========================
    const existingUser = await User.findOne({
        _id: userId,
        isDeleted: false
    })

    if(!existingUser){
        throw new ApiError(404,
            "user not found")
    }
}
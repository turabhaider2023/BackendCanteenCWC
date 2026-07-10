import {User} from "../models/user.js"
import { Designation } from "../models/designation.js";
import { Office } from "../models/office.js";
import { Role } from "../models/role.js";
import mongoose from "mongoose";
import validator from "validator";

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
        Error("name,officialEmail,mobileNumber,designationId and officeId are required")
    }

    if(typeof name !=="string"){
        throw new Error("name must a string type")
    }
    if(name.trim()===""){
        throw new Error("name is empty")
    }
     
    if(typeof officialEmail !=="string"){
        throw new Error("email must be a string")
    }
    if(officialEmail.trim()===""){
        throw new Error("email is empty")
    }

    if(!validator.isEmail(officialEmail.trim())){
        throw new Error("email is invalid")
    }

    if(typeof mobileNumber!=="string"){
        throw new Error("mobile number must be a string")
    }
    if(mobileNumber.trim()===""){
        throw new Error("mobile number is empty")
    }

    if(!validator.isMobilePhone(mobileNumber.trim(),"en-IN")||
    mobileNumber.trim().length!==10){
        throw new Error("mobile number must be a 10 digit Indian mobile number")
    }

    if(!mongoose.Types.ObjectId.isValid(designationId)){
        throw new Error("designationId is not valid")
    }

    if(!mongoose.Types.ObjectId.isValid(officeId)){
        throw new Error("officeId is not valid")
    }

    if(roles!==undefined){
        if(!Array.isArray(roles)){
            throw new Error("roles must an array")
        }

        if(roles.length===0){
            throw new Error("role array can not be empty")
        }

        const allRolesIdsValid = roles.every((roleId)=>
            mongoose.Types.ObjectId.isValid(roleId)
        )

        if(!allRolesIdsValid){
            throw new Error("one or more roleIds are not valid")
        }

        
    }

   
    //DB validations

    const existingUserByEmail = await User.findOne({
        officialEmail:officialEmail.trim().toLowerCase(),
        isDeleted:false
    })

    if(existingUserByEmail){
        throw new Error("user already exist")
    }

    const existingUserByMobile = await User.findOne({
        mobileNumber:mobileNumber.trim(),
        isDeleted:false
    })

    if(existingUserByMobile){
        throw new Error("user already exist")
    }

    const existingDesignation = await Designation.findOne({
        _id:designationId,
        isDeleted:false
    })

    if(!existingDesignation){
        throw new Error("designation not exist")
    }

    const exisitingOfficeId = await Office.findOne({
        _id:officeId,
        isDeleted:false
    })

    if(!exisitingOfficeId){
        throw new Error("office does not exist")
    }

    //Request validation me tumne roleIds ka format check kar liya — good.
    //But DB me actual role exist bhi karta hai ya nahi, wo abhi missing hai.

    if (roles !== undefined) {
    const existingRoles = await Role.find({
        _id: { $in: roles },
        isDeleted: false
    });

    if (existingRoles.length !== roles.length) {
        throw new Error("one or more roles do not exist");
    }

    
}
    else {
    const defaultUserRole = await Role.findOne({
        roleName: "User",
        isDeleted: false
    });

    if (!defaultUserRole) {
        throw new Error('default role "User" does not exist');
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
        throw new Error("can not update empty object");
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
        throw new Error("this field is not allowed to update");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("userId is not valid");
    }

    if (name !== undefined) {
        if (typeof name !== "string") {
            throw new Error("name must be a string");
        }

        if (name.trim() === "") {
            throw new Error("name can not be empty");
        }
    }

    if (officialEmail !== undefined) {
        if (typeof officialEmail !== "string") {
            throw new Error("officialEmail must be a string");
        }

        if (officialEmail.trim() === "") {
            throw new Error("officialEmail can not be empty");
        }

        if (!validator.isEmail(officialEmail.trim())) {
            throw new Error("officialEmail is invalid");
        }
    }

    if (mobileNumber !== undefined) {
        if (typeof mobileNumber !== "string") {
            throw new Error("mobileNumber must be a string");
        }

        if (mobileNumber.trim() === "") {
            throw new Error("mobileNumber can not be empty");
        }

        if (
            !validator.isMobilePhone(mobileNumber.trim(), "en-IN") ||
            mobileNumber.trim().length !== 10
        ) {
            throw new Error("mobileNumber must be a 10 digit Indian mobile number");
        }
    }

    if (designationId !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(designationId)) {
            throw new Error("designationId is not valid");
        }
    }

    if (officeId !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(officeId)) {
            throw new Error("officeId is not valid");
        }
    }

    if (roles !== undefined) {
        if (!Array.isArray(roles)) {
            throw new Error("roles must be an array");
        }

        if (roles.length === 0) {
            throw new Error("roles array can not be empty");
        }

        const allRolesIdsValid = roles.every((roleId) =>
            mongoose.Types.ObjectId.isValid(roleId)
        );

        if (!allRolesIdsValid) {
            throw new Error("one or more roleIds are not valid");
        }
    }

    if (isActive !== undefined && typeof isActive !== "boolean") {
        throw new Error("isActive must be true or false");
    }

    // =========================
    // 2. DATABASE VALIDATIONS
    // =========================

    const existingUser = await User.findOne({
        _id: userId,
        isDeleted: false
    });

    if (!existingUser) {
        throw new Error("user does not exist");
    }

    if (officialEmail !== undefined) {
        const existingUserByEmail = await User.findOne({
            officialEmail: officialEmail.trim().toLowerCase(),
            isDeleted: false,
            _id: { $ne: userId }
        });

        if (existingUserByEmail) {
            throw new Error("officialEmail already exists");
        }
    }

    if (mobileNumber !== undefined) {
        const existingUserByMobile = await User.findOne({
            mobileNumber: mobileNumber.trim(),
            isDeleted: false,
            _id: { $ne: userId }
        });

        if (existingUserByMobile) {
            throw new Error("mobileNumber already exists");
        }
    }

    if (designationId !== undefined) {
        const existingDesignation = await Designation.findOne({
            _id: designationId,
            isDeleted: false
        });

        if (!existingDesignation) {
            throw new Error("designation does not exist");
        }
    }

    if (officeId !== undefined) {
        const existingOffice = await Office.findOne({
            _id: officeId,
            isDeleted: false
        });

        if (!existingOffice) {
            throw new Error("office does not exist");
        }
    }

    if (roles !== undefined) {
        const existingRoles = await Role.find({
            _id: { $in: roles },
            isDeleted: false
        });

        if (existingRoles.length !== roles.length) {
            throw new Error("one or more roles do not exist");
        }
    }
};

export const deleteUserValidation = async(req)=>{
    const { userId } = req.params

    // =========================
    // 1. REQUEST DATA VALIDATIONS
    // =========================
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("userId is not valid")
    }

    // =========================
    // 2. DATABASE VALIDATIONS
    // =========================
    const existingUser = await User.findOne({
        _id: userId,
        isDeleted: false
    })

    if(!existingUser){
        throw new Error("user does not exist")
    }
}
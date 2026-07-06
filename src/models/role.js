import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName:{
        type:String,
        required:true,
        unique:true,
        trim:true
        
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Role = mongoose.model("Role",roleSchema)
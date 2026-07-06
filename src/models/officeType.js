import mongoose from "mongoose";

const officeTypeSchema = new mongoose.Schema({
    officeTypeName:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    level:{
        type:Number,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})

export const OfficeType = mongoose.model("OfficeType",officeTypeSchema)
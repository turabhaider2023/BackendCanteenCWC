import mongoose from "mongoose";

const officeSchema = new mongoose.Schema({
    officeName:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    parentOfficeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Office",
    },
    officeTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OfficeType",
        required:true
    },
    city:{
        type:String,
        required:true
    },
    regionType:{
        type:String,
        enum:["Headquarter","Regional"],
        required:true,
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
},{
    timestamps:true
})

export const Office = mongoose.model("Office",officeSchema)
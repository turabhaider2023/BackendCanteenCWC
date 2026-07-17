import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    officialEmail:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    designationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Designation",
        required:true
    },
    officeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Office",
        required:true

    },
    roles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
        

    }],
    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }


},
{
    timestamps:true
})

export const User = mongoose.model("User",userSchema)
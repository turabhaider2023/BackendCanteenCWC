import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({

    designationName:{
        type:String,
        required:true,
        trim:true,
        unique:true
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

export const Designation = mongoose.model("Designation",designationSchema)
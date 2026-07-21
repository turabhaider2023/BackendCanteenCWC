import mongoose from "mongoose";
import { uppercase } from "zod";


const brandSchema = new mongoose.Schema({
    brandName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        uppercase:true,
        maxlength:100,
        
    },

    description:{
        type:String,
        trim:true,
        maxlength:500
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

export const Brand = mongoose.model("Brand",brandSchema)
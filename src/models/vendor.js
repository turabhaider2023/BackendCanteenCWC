import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    vendorName:{
        type:String,
        required:true,
        trim:true
    },

    gstNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        uppercase:true

    },

    contactPerson:{
        type:String,
        trim:true
    },

    vendorMobile:{
        type:String,
        required:true,
        trim:true,
       
    },

    vendorEmail:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },

    address:{
        type:String,
        required:true,
        trim:true
    },

    state:{
        type:String,
        required:true,
        trim:true
    },

    city:{
        type:String,
        required:true,
        trim:true
    },

    pinCode:{
        type:String,
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
},{timestamps:true})

export const Vendor = mongoose.model("Vendor",vendorSchema)
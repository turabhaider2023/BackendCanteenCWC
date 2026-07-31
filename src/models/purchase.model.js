import mongoose from "mongoose";
import { PURCHASE_STATUS } from "../constants/purchase.constants.js";





const purchaseSchema = new mongoose.Schema({
    purchaseNo:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        uppercase:true

    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},

    invoiceNo:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },

    invoiceDate:{
        type:Date,
        required:true
    },

    receivedDate:{
        type:Date,
        
    },

    subtotal:{
        type:Number,
        required:true,
        min:0

    },

    taxAmount:{
        type:Number,
        required:true,
        min:0,
        default:0

    },

    grandTotal:{
        type:Number,
        required:true,
        min:0

    },

    
    status: {
      type: String,
      enum: Object.values(PURCHASE_STATUS),
      default: PURCHASE_STATUS.DRAFT,
      required: true
    },

    remarks:{
        type:String,
        trim:true,
        maxlength:500
    }
},
{timestamps:true})

purchaseSchema.index(
    { vendorId: 1
    ,invoiceNo: 1
 }
 ,{
    unique:true
}); 
purchaseSchema.index({ status: 1 }); 
purchaseSchema.index({ receivedDate: -1 })


export const Purchase = mongoose.model("Purchase",purchaseSchema)
import mongoose from "mongoose";

const ItemCategorySchema = new mongoose.Schema({
    itemCategoryName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxlength: 100
    },
    description: {
    type: String,
    trim: true,
    maxlength: 500
},

isDeleted:{
    type:Boolean,
    default:false
},

isActive:{
    type:Boolean,
    default:true
}


},{timestamps:true})

export const ItemCategory = mongoose.model("ItemCategory",ItemCategorySchema)
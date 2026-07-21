import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        itemMasterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ItemMaster",
            required: true
        },

        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        unitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },


        itemCode: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            unique: true,
            maxlength: 20
        },

      
      

      
        
        description: {
            type: String,
            trim: true,
            maxlength: 500
        },

        isPerishable: {
            type: Boolean,
            default: false
        },

        minimumStock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        maximumStock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        isActive: {
            type: Boolean,
            default: true
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const Item = mongoose.model("Item", itemSchema);
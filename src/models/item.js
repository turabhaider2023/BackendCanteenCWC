import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 100
        },

        itemCode: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            unique: true,
            maxlength: 20
        },

        itemCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ItemCategory",
            required: true
        },

        unitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },
        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
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
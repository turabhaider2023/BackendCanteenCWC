import mongoose from "mongoose";

const itemMasterSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 100
        },

        itemCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ItemCategory",
            required: true
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500
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

export const ItemMaster = mongoose.model("ItemMaster", itemMasterSchema);
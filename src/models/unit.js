import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
    {
        unitName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 100
        },

        unitCode: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            unique: true,
            maxlength: 10
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

export const Unit = mongoose.model("Unit", unitSchema);
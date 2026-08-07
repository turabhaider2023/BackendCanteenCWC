import mongoose from "mongoose";
import { COUNTER_MODULE } from "../constants/counter.constants.js";

const counterSchema = new mongoose.Schema(
    {
        module: {
            type: String,
            enum: Object.values(COUNTER_MODULE),
            required: true
        },

        year: {
            type: Number,
            required: true,
            min: 2000
        },

        sequence: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

// One counter per module per year
counterSchema.index(
    {
        module: 1,
        year: 1
    },
    {
        unique: true
    }
);

export const Counter = mongoose.model("Counter", counterSchema);
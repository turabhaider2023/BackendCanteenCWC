import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {   
        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        },
        
        itemMasterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ItemMaster",
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

        creditPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
    set: (v) => Math.round(Number(v) || 0)
},

mrp: {
    type: Number,
    min: 0,
    default: 0,
    set: (v) => Math.round(Number(v) || 0)
},

priceUpdatedAt: {
    type: Date
},

priceHistory: {
    type: [
        {
            creditPrice: {
                type: Number,
                required: true,
                min: 0
            },

            mrp: {
                type: Number,
                min: 0
            },

            source: {
                type: String,
                enum: ["manual", "purchase", "batch"],
                required: true
            },

            note: {
                type: String,
                trim: true,
                maxlength: 120
            },

            changedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CwcUser"
            },

            changedAt: {
                type: Date,
                required: true
            }
        }
    ],
    select: false
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
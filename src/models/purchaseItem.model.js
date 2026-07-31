import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
  {
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
      required: true
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },

    itemCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    itemName: {
      type: String,
      required: true,
      trim: true
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0
    },

    mrp: {
      type: Number,
      required: true,
      min: 0
    },

    receivedQuantity: {
      type: Number,
      required: true,
      min: 1
    },

    freeQuantity: {
      type: Number,
      default: 0,
      min: 0
    },

    lineTotal: {
      type: Number,
      required: true,
      min: 0
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

purchaseItemSchema.index({ purchaseId: 1 });
purchaseItemSchema.index({ itemId: 1 });

export const PurchaseItem = mongoose.model(
  "PurchaseItem",
  purchaseItemSchema
);
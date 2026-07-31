import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      unique: true
    },

    currentStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    reservedStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    isAvailable: {
      type: Boolean,
      default: true,
      required: true
    },

    reorderLevel: {
      type: Number,
      required: true,
      min: 0,
      default: 0
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

    lastReceivedDate: {
      type: Date
    },

    lastIssueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

inventorySchema.index({ itemId: 1 }, { unique: true });
inventorySchema.index({ isAvailable: 1 });
inventorySchema.index({ currentStock: 1 });

export const Inventory = mongoose.model("Inventory", inventorySchema);
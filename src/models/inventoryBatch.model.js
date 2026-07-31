import mongoose from "mongoose";

const inventoryBatchSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true
    },

    purchaseItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseItem",
      required: true
    },

    batchNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true
    },

    manufacturerBatchNo: {
      type: String,
      trim: true,
      uppercase: true
    },

    originalQuantity: {
      type: Number,
      required: true,
      min: 1
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    unitCost: {
      type: Number,
      required: true,
      min: 0
    },

    receivedDate: {
      type: Date,
      required: true
    },

    manufacturingDate: {
      type: Date
    },

    expiryDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

inventoryBatchSchema.index({ inventoryId: 1 });
inventoryBatchSchema.index({ purchaseItemId: 1 });
inventoryBatchSchema.index({ batchNumber: 1 }, { unique: true });
inventoryBatchSchema.index({ expiryDate: 1 });

export const InventoryBatch = mongoose.model(
  "InventoryBatch",
  inventoryBatchSchema
);
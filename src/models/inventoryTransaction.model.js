import mongoose from "mongoose";
import {
  INVENTORY_MOVEMENT_TYPE,
  INVENTORY_TRANSACTION_TYPE
} from "../constants/inventory.constants.js";

const inventoryTransactionSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
      index: true
    },

    inventoryBatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryBatch",
      required: true,
      index: true
    },

    transactionType: {
      type: String,
      enum: Object.values(INVENTORY_TRANSACTION_TYPE),
      required: true,
      index: true
    },

    movementType: {
      type: String,
      enum: Object.values(INVENTORY_MOVEMENT_TYPE),
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    unitCost: {
      type: Number,
      required: true,
      min: 0
    },

    balanceAfterTransaction: {
      type: Number,
      required: true,
      min: 0
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    transactionDate: {
      type: Date,
      required: true,
      default: Date.now,
      index: true
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

// Compound Indexes
inventoryTransactionSchema.index({
  inventoryId: 1,
  transactionDate: -1
});

inventoryTransactionSchema.index({
  inventoryBatchId: 1,
  transactionDate: -1
});

inventoryTransactionSchema.index({
  transactionType: 1,
  transactionDate: -1
});

export const InventoryTransaction = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema
);
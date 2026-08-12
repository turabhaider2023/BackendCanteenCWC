import mongoose from "mongoose";

import { Purchase } from "../models/purchase.model.js";
import { PurchaseItem } from "../models/purchaseItem.model.js";
import { Vendor } from "../models/vendor.model.js";
import { Item } from "../models/item.model.js";
import ApiError from "../utils/ApiError.js";
import { generateSequenceNumber } from "../utils/sequence.helper.js"

import { COUNTER_MODULE } from "../constants/counter.constants.js";
import {PURCHASE_STATUS} from "../constants/purchase.constants.js";
import { receiveStock } from "../services/inventory.service.js"
// =============================
// Public Functions
// =============================
export const createPurchase = async (purchaseData,userId) => {
    const {vendorId,invoiceNo,invoiceDate,remarks,purchaseItems} = purchaseData;

    const session = await mongoose.startSession()

    try {
         session.startTransaction()

         const vendor = await Vendor.findOne({
        _id:vendorId,
        isDeleted:false
    }).session(session)

    if(!vendor){
        throw new ApiError(
            404,
            "Vendor not found"
        )
    }
    // check for duplicate invoice

    const existingPurchase = await Purchase.findOne({
        vendorId,
        invoiceNo,
    }).session(session)

    if(existingPurchase){
        throw new ApiError(
            409,
            "Purchase invoice already exists"
        )
    }

    // item validation 

    const itemIds = []

    for (const purchaseItem of purchaseItems){
        itemIds.push(purchaseItem.itemId)
    }

    const existingItems = await Item.find({
        _id:{$in:itemIds},
        isDeleted:false

    })
    .populate("itemMasterId","itemName")
    .session(session)

    if(existingItems.length !== itemIds.length){
        throw new ApiError(
            404,
            "One or more items do not exist"
        )
    }

    // generate purchase number 

    const purchaseNo = await generateSequenceNumber(
    COUNTER_MODULE.PURCHASE,
    "PUR",
    session
);

    
    const processedPurchaseItems = []
   for (const purchaseItem of purchaseItems){
    const item = existingItems.find(
        existingItem => 
            existingItem._id.toString()===purchaseItem.itemId.toString()
    )

    const processedPurchaseItem = {
        itemId :item._id,
        itemCode :item.itemCode,
        itemName :item.itemMasterId.itemName,
        receivedQuantity : purchaseItem.receivedQuantity,
        freeQuantity : purchaseItem.freeQuantity,
        purchasePrice : purchaseItem.purchasePrice,
        mrp : purchaseItem.mrp,
        manufacturingDate: purchaseItem.manufacturingDate,
        expiryDate: purchaseItem.expiryDate,
        remarks: purchaseItem.remarks

    }

    processedPurchaseItems
    .push(calculatePurchaseItemTotals(processedPurchaseItem))
}

    
    const {subtotal,taxAmount,grandTotal}=calculatePurchaseTotals(processedPurchaseItems)

    const purchase = new Purchase({
        purchaseNo,
        vendorId,
        createdBy:userId,
        invoiceNo,
        invoiceDate,
        subtotal,
        taxAmount,
        grandTotal,
        remarks
    })

    await purchase.save({session})

    const purchaseItemDocuments = []

    for (const purchaseItem of processedPurchaseItems){
        purchaseItemDocuments.push({
            ...purchaseItem,
            purchaseId:purchase._id
        })
    }

    await PurchaseItem.insertMany(
        purchaseItemDocuments,
        {
            session
        }
    )

    await session.commitTransaction()

    return purchase


    



    

    } catch (error) {
        await  session.abortTransaction()
        throw error
    }

    finally{
        await session.endSession()
    }

    // validating the vendor 

   
}

export const receivePurchase = async (purchaseId, performedBy) => {
    const purchase = await Purchase.findById(
        purchaseId
        
    )

    if(!purchase){
        throw new ApiError(
            404,
            "Purchase not found"
        )
    }

    if(purchase.status!==PURCHASE_STATUS.DRAFT){
        throw new ApiError(
            409,
            "Only draft purchase can be received"
        )
    }

    const purchaseItems = await PurchaseItem.find({
        purchaseId
    })

    if(purchaseItems.length===0){
        throw new ApiError(
            404,
            "Items of this purchase not found"
        )
    }

    const session = await mongoose.startSession()

    const receivedDate = new Date();

    try {
        session.startTransaction()

        await receiveStock(
            purchase,
            purchaseItems,
            receivedDate,
            performedBy,
            session
        )

        purchase.status = PURCHASE_STATUS.RECEIVED;
        purchase.receivedDate = receivedDate


        await purchase.save({session})

        await session.commitTransaction()

        return purchase

    } catch (error) {
        await session.abortTransaction()

        throw error
    }

    finally{
        await session.endSession()
    }
    


}


export const getAllPurchases = async () => {
    const purchases = await Purchase.find()
        .sort({ createdAt: -1 });

    return purchases;
};

export const getPurchaseById = async (data) => {
    const purchaseId = data

    const purchase = await Purchase.findOne({
        _id:purchaseId
    })

    if(!purchase){
        throw new ApiError(
            404,
            "Purchase not found"
        )
    }

    return purchase
};

export const updatePurchase = async (purchaseId, updateData) => {

    const {
        vendorId,
        invoiceNo,
        invoiceDate,
        remarks,
        purchaseItems
    } = updateData;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Find purchase
        const purchase = await Purchase.findById(
            purchaseId
        ).session(session);

        if (!purchase) {
            throw new ApiError(
                404,
                "Purchase not found"
            );
        }

        // Only draft purchase can be updated
        if (purchase.status !== PURCHASE_STATUS.DRAFT) {
            throw new ApiError(
                409,
                "Only draft purchase can be updated"
            );
        }

        // Validate vendor
        const vendor = await Vendor.findOne({
            _id: vendorId,
            isDeleted: false
        }).session(session);

        if (!vendor) {
            throw new ApiError(
                404,
                "Vendor not found"
            );
        }

        // Validate purchase items
        if (
            !Array.isArray(purchaseItems) ||
            purchaseItems.length === 0
        ) {
            throw new ApiError(
                400,
                "Purchase must contain at least one item"
            );
        }

        // Check duplicate items inside purchase
        const itemIds = [];
        const uniqueItemIds = new Set();

        for (const purchaseItem of purchaseItems) {

            if (uniqueItemIds.has(
                purchaseItem.itemId.toString()
            )) {
                throw new ApiError(
                    409,
                    "Duplicate item is not allowed in purchase"
                );
            }

            uniqueItemIds.add(
                purchaseItem.itemId.toString()
            );

            itemIds.push(purchaseItem.itemId);
        }

        // Validate items
        const existingItems = await Item.find({
            _id: {
                $in: itemIds
            },
            isDeleted: false
        }).session(session);

        if (existingItems.length !== itemIds.length) {
            throw new ApiError(
                404,
                "One or more items do not exist"
            );
        }

        // Check duplicate invoice
        const existingPurchase = await Purchase.findOne({
            vendorId,
            invoiceNo,
            _id: {
                $ne: purchaseId
            }
        }).session(session);

        if (existingPurchase) {
            throw new ApiError(
                409,
                "Purchase invoice already exists"
            );
        }

        // Calculate purchase item totals
        const processedPurchaseItems = [];

        for (const purchaseItem of purchaseItems) {

            processedPurchaseItems.push(
                calculatePurchaseItemTotals(
                    purchaseItem
                )
            );
        }

        // Calculate purchase totals
        const {
            subtotal,
            taxAmount,
            grandTotal
        } = calculatePurchaseTotals(
            processedPurchaseItems
        );

        // Update purchase
        purchase.vendorId = vendorId;
        purchase.invoiceNo = invoiceNo;
        purchase.invoiceDate = invoiceDate;
        purchase.subtotal = subtotal;
        purchase.taxAmount = taxAmount;
        purchase.grandTotal = grandTotal;
        purchase.remarks = remarks;

        await purchase.save({
            session
        });

        // Remove existing purchase items
        await PurchaseItem.deleteMany({
            purchaseId: purchase._id
        }).session(session);

        // Create updated purchase items
        const purchaseItemDocuments = [];

        for (const purchaseItem of processedPurchaseItems) {

            purchaseItemDocuments.push({
                ...purchaseItem,
                purchaseId: purchase._id
            });
        }

        await PurchaseItem.insertMany(
            purchaseItemDocuments,
            {
                session
            }
        );

        await session.commitTransaction();

        return purchase;

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        await session.endSession();
    }
};




export const cancelPurchase = async (purchaseId) => {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Find purchase
        const purchase = await Purchase.findById(
            purchaseId
        ).session(session);

        if (!purchase) {
            throw new ApiError(
                404,
                "Purchase not found"
            );
        }

        // Only draft purchase can be cancelled
        if (purchase.status !== PURCHASE_STATUS.DRAFT) {
            throw new ApiError(
                409,
                "Only draft purchase can be cancelled"
            );
        }

        // Update purchase status
        purchase.status = PURCHASE_STATUS.CANCELLED;

        await purchase.save({
            session
        });

        await session.commitTransaction();

        return purchase;

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        await session.endSession();
    }
};




// =============================
// Private Helper Functions
// =============================




const calculatePurchaseItemTotals = (purchaseItem) => {
    const { purchasePrice, receivedQuantity } = purchaseItem;

    const lineTotal = purchasePrice * receivedQuantity;

    return {
        ...purchaseItem,
        lineTotal
    };
};

const calculatePurchaseTotals = (purchaseItems) => {
    let subtotal = 0;

    for (const purchaseItem of purchaseItems) {
        subtotal += purchaseItem.lineTotal;
    }

    const taxAmount = 0;

    const grandTotal = subtotal + taxAmount;

    return {
        subtotal,
        taxAmount,
        grandTotal
    };
};


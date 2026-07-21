import { ItemMaster } from "../models/itemMaster.js";
import { ItemCategory } from "../models/itemCategory.js";
import ApiError from "../utils/ApiError.js";

export const createItemMasterService = async (data) => {
    const {
        itemName,
        itemCategoryId,
        description
    } = data;

    const existingItemMaster = await ItemMaster.findOne({
        itemName,
        isDeleted: false
    });

    if (existingItemMaster) {
        throw new ApiError(
            409,
            "Item name already exists"
        );
    }

    const itemCategory = await ItemCategory.findOne({
        _id: itemCategoryId,
        isDeleted: false
    });

    if (!itemCategory) {
        throw new ApiError(
            404,
            "Item category not found"
        );
    }

    try {
        const newItemMaster = await ItemMaster.create({
            itemName,
            itemCategoryId,
            description
        });

        return newItemMaster;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item name already exists"
            );
        }

        throw error;
    }
};

export const getAllItemMastersService = async () => {
    const allItemMasters = await ItemMaster.find({
        isDeleted: false
    })
        .populate("itemCategoryId", "itemCategoryName")
        .sort({ itemName: 1 });

    return allItemMasters;
};

export const getItemMasterByIdService = async (data) => {
    const { itemMasterId } = data;

    const itemMaster = await ItemMaster.findOne({
        _id: itemMasterId,
        isDeleted: false
    })
        .populate("itemCategoryId", "itemCategoryName");

    if (!itemMaster) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    return itemMaster;
};

export const updateItemMasterService = async (data) => {
    const {
        itemMasterId,
        itemName,
        itemCategoryId,
        description,
        isActive
    } = data;

    const existingItemMaster = await ItemMaster.findOne({
        _id: itemMasterId,
        isDeleted: false
    });

    if (!existingItemMaster) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    if (itemName !== undefined) {
        const duplicateItemMaster = await ItemMaster.findOne({
            itemName,
            isDeleted: false,
            _id: { $ne: itemMasterId }
        });

        if (duplicateItemMaster) {
            throw new ApiError(
                409,
                "Item name already exists"
            );
        }
    }

    if (itemCategoryId !== undefined) {
        const itemCategory = await ItemCategory.findOne({
            _id: itemCategoryId,
            isDeleted: false
        });

        if (!itemCategory) {
            throw new ApiError(
                404,
                "Item category not found"
            );
        }
    }

    const updatedData = {};

    if (itemName !== undefined)
        updatedData.itemName = itemName;

    if (itemCategoryId !== undefined)
        updatedData.itemCategoryId = itemCategoryId;

    if (description !== undefined)
        updatedData.description = description;

    if (isActive !== undefined)
        updatedData.isActive = isActive;

    try {
        const updatedItemMaster = await ItemMaster.findByIdAndUpdate(
            itemMasterId,
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return updatedItemMaster;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item name already exists"
            );
        }

        throw error;
    }
};

export const deleteItemMasterService = async (data) => {
    const { itemMasterId } = data;

    const existingItemMaster = await ItemMaster.findOne({
        _id: itemMasterId,
        isDeleted: false
    });

    if (!existingItemMaster) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    const deletedItemMaster = await ItemMaster.findByIdAndUpdate(
        itemMasterId,
        {
            isDeleted: true,
            isActive: false
        },
        {
            returnDocument: "after"
        }
    );

    return deletedItemMaster;
};
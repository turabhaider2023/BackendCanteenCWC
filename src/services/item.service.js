import { Item } from "../models/item.js";
import { ItemCategory } from "../models/itemCategory.js";
import { Unit } from "../models/unit.js";
import ApiError from "../utils/ApiError.js";

export const createItemService = async (data) => {
    const {
        itemName,
        itemCode,
        itemCategoryId,
        unitId,
        description,
        isPerishable,
        minimumStock,
        maximumStock
    } = data;

    const existingItem = await Item.findOne({
        $or: [
            { itemName },
            { itemCode }
        ],
        isDeleted: false
    });

    if (existingItem) {
        if (existingItem.itemName === itemName) {
            throw new ApiError(
                409,
                "Item with this name already exists"
            );
        }

        if (existingItem.itemCode === itemCode) {
            throw new ApiError(
                409,
                "Item with this code already exists"
            );
        }
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

    const unit = await Unit.findOne({
        _id: unitId,
        isDeleted: false
    });

    if (!unit) {
        throw new ApiError(
            404,
            "Unit not found"
        );
    }

    try {
        const newItem = await Item.create({
            itemName,
            itemCode,
            itemCategoryId,
            unitId,
            description,
            isPerishable,
            minimumStock,
            maximumStock
        });

        return newItem;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item already exists"
            );
        }

        throw error;
    }
};

export const getAllItemsService = async () => {
    const allItems = await Item.find({
        isDeleted: false
    })
        .populate("itemCategoryId", "itemCategoryName")
        .populate("unitId", "unitName unitCode")
        .sort({ itemName: 1 });

    return allItems;
};

export const getItemByIdService = async (data) => {
    const { itemId } = data;

    const item = await Item.findOne({
        _id: itemId,
        isDeleted: false
    })
        .populate("itemCategoryId", "itemCategoryName")
        .populate("unitId", "unitName unitCode");

    if (!item) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    return item;
};

export const updateItemService = async (data) => {
    const {
        itemId,
        itemName,
        itemCode,
        itemCategoryId,
        unitId,
        description,
        isPerishable,
        minimumStock,
        maximumStock,
        isActive
    } = data;

    const existingItem = await Item.findOne({
        _id: itemId,
        isDeleted: false
    });

    if (!existingItem) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    if (itemName !== undefined) {
        const duplicateItemName = await Item.findOne({
            itemName,
            isDeleted: false,
            _id: { $ne: itemId }
        });

        if (duplicateItemName) {
            throw new ApiError(
                409,
                "Item with this name already exists"
            );
        }
    }

    if (itemCode !== undefined) {
        const duplicateItemCode = await Item.findOne({
            itemCode,
            isDeleted: false,
            _id: { $ne: itemId }
        });

        if (duplicateItemCode) {
            throw new ApiError(
                409,
                "Item with this code already exists"
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

    if (unitId !== undefined) {
        const unit = await Unit.findOne({
            _id: unitId,
            isDeleted: false
        });

        if (!unit) {
            throw new ApiError(
                404,
                "Unit not found"
            );
        }
    }

    const updatedData = {};

    if (itemName !== undefined) updatedData.itemName = itemName;
    if (itemCode !== undefined) updatedData.itemCode = itemCode;
    if (itemCategoryId !== undefined) updatedData.itemCategoryId = itemCategoryId;
    if (unitId !== undefined) updatedData.unitId = unitId;
    if (description !== undefined) updatedData.description = description;
    if (isPerishable !== undefined) updatedData.isPerishable = isPerishable;
    if (minimumStock !== undefined) updatedData.minimumStock = minimumStock;
    if (maximumStock !== undefined) updatedData.maximumStock = maximumStock;
    if (isActive !== undefined) updatedData.isActive = isActive;

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return updatedItem;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item already exists"
            );
        }

        throw error;
    }
};

export const deleteItemService = async (data) => {
    const { itemId } = data;

    const existingItem = await Item.findOne({
        _id: itemId,
        isDeleted: false
    });

    if (!existingItem) {
        throw new ApiError(
            404,
            "Item not found"
        );
    }

    const deletedItem = await Item.findByIdAndUpdate(
        itemId,
        {
            isDeleted: true,
            isActive: false
        },
        {
            returnDocument: "after"
        }
    );

    return deletedItem;
};
import { ItemCategory } from "../models/itemCategory.js";
import ApiError from "../utils/ApiError.js";

export const createItemCategoryService = async (data) => {
    const { itemCategoryName, description } = data;

    const existingItemCategory = await ItemCategory.findOne({
        itemCategoryName,
        isDeleted: false
    });

    if (existingItemCategory) {
        throw new ApiError(
            409,
            "Item category with this name already exists"
        );
    }

    try {
        const newItemCategory = await ItemCategory.create({
            itemCategoryName,
            description
        });

        return newItemCategory;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item category with this name already exists"
            );
        }

        throw error;
    }
};

export const getAllItemCategoriesService = async () => {
    const allItemCategories = await ItemCategory.find({
        isDeleted: false
    }).sort({ itemCategoryName: 1 });

    return allItemCategories;
};

export const getItemCategoryByIdService = async (data) => {
    const { itemCategoryId } = data;

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

    return itemCategory;
};

export const updateItemCategoryService = async (data) => {
    const {
        itemCategoryId,
        itemCategoryName,
        description,
        isActive
    } = data;

    const existingItemCategory = await ItemCategory.findOne({
        _id: itemCategoryId,
        isDeleted: false
    });

    if (!existingItemCategory) {
        throw new ApiError(
            404,
            "Item category not found"
        );
    }

    if (itemCategoryName !== undefined) {
        const duplicateItemCategory = await ItemCategory.findOne({
            itemCategoryName,
            isDeleted: false,
            _id: { $ne: itemCategoryId }
        });

        if (duplicateItemCategory) {
            throw new ApiError(
                409,
                "Item category with this name already exists"
            );
        }
    }

    const updatedData = {};

    if (itemCategoryName !== undefined) {
        updatedData.itemCategoryName = itemCategoryName;
    }

    if (description !== undefined) {
        updatedData.description = description;
    }

    if (isActive !== undefined) {
        updatedData.isActive = isActive;
    }

    try {
        const updatedItemCategory = await ItemCategory.findByIdAndUpdate(
            itemCategoryId,
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return updatedItemCategory;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Item category with this name already exists"
            );
        }

        throw error;
    }
};

export const deleteItemCategoryService = async (data) => {
    const { itemCategoryId } = data;

    const existingItemCategory = await ItemCategory.findOne({
        _id: itemCategoryId,
        isDeleted: false
    });

    if (!existingItemCategory) {
        throw new ApiError(
            404,
            "Item category not found"
        );
    }

    const deletedItemCategory = await ItemCategory.findByIdAndUpdate(
        itemCategoryId,
        {
            isDeleted: true,
            isActive: false
        },
        {
            returnDocument: "after"
        }
    );

    return deletedItemCategory;
};
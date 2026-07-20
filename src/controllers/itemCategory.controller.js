import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createItemCategoryService,
    getAllItemCategoriesService,
    getItemCategoryByIdService,
    updateItemCategoryService,
    deleteItemCategoryService
} from "../services/itemCategory.service.js";

export const createItemCategory = asyncHandler(async (req, res) => {
    const newItemCategory = await createItemCategoryService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            newItemCategory,
            "Item category created successfully"
        )
    );
});

export const getAllItemCategories = asyncHandler(async (req, res) => {
    const allItemCategories = await getAllItemCategoriesService();

    return res.status(200).json(
        new ApiResponse(
            200,
            allItemCategories,
            "All item categories fetched successfully"
        )
    );
});

export const getItemCategoryById = asyncHandler(async (req, res) => {
    const itemCategory = await getItemCategoryByIdService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            itemCategory,
            "Item category fetched successfully"
        )
    );
});

export const updateItemCategory = asyncHandler(async (req, res) => {
    const updatedItemCategory = await updateItemCategoryService({
        itemCategoryId: req.params.itemCategoryId,
        ...req.body
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedItemCategory,
            "Item category updated successfully"
        )
    );
});

export const deleteItemCategory = asyncHandler(async (req, res) => {
    const deletedItemCategory = await deleteItemCategoryService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedItemCategory,
            "Item category soft deleted successfully"
        )
    );
});
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createItemService,
    getAllItemsService,
    getItemByIdService,
    updateItemService,
    deleteItemService
} from "../services/item.service.js";

export const createItem = asyncHandler(async (req, res) => {
    const newItem = await createItemService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            newItem,
            "Item created successfully"
        )
    );
});

export const getAllItems = asyncHandler(async (req, res) => {
    const allItems = await getAllItemsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            allItems,
            "All items fetched successfully"
        )
    );
});

export const getItemById = asyncHandler(async (req, res) => {
    const item = await getItemByIdService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            item,
            "Item fetched successfully"
        )
    );
});

export const updateItem = asyncHandler(async (req, res) => {
    const updatedItem = await updateItemService({
        itemId: req.params.itemId,
        ...req.body
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedItem,
            "Item updated successfully"
        )
    );
});

export const deleteItem = asyncHandler(async (req, res) => {
    const deletedItem = await deleteItemService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedItem,
            "Item soft deleted successfully"
        )
    );
});
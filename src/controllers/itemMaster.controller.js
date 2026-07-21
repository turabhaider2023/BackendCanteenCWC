import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createItemMasterService,
    getAllItemMastersService,
    getItemMasterByIdService,
    updateItemMasterService,
    deleteItemMasterService
} from "../services/itemMaster.service.js";

export const createItemMaster = asyncHandler(async (req, res) => {
    const newItemMaster = await createItemMasterService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            newItemMaster,
            "Item created successfully"
        )
    );
});

export const getAllItemMasters = asyncHandler(async (req, res) => {
    const allItemMasters = await getAllItemMastersService();

    return res.status(200).json(
        new ApiResponse(
            200,
            allItemMasters,
            "All items fetched successfully"
        )
    );
});

export const getItemMasterById = asyncHandler(async (req, res) => {
    const itemMaster = await getItemMasterByIdService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            itemMaster,
            "Item fetched successfully"
        )
    );
});

export const updateItemMaster = asyncHandler(async (req, res) => {
    const updatedItemMaster = await updateItemMasterService({
        itemMasterId: req.params.itemMasterId,
        ...req.body
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedItemMaster,
            "Item updated successfully"
        )
    );
});

export const deleteItemMaster = asyncHandler(async (req, res) => {
    const deletedItemMaster = await deleteItemMasterService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedItemMaster,
            "Item soft deleted successfully"
        )
    );
});
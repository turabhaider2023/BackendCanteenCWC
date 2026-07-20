import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createUnitService,
    getAllUnitsService,
    getUnitByIdService,
    updateUnitService,
    deleteUnitService
} from "../services/unit.service.js";

export const createUnit = asyncHandler(async (req, res) => {
    const newUnit = await createUnitService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            newUnit,
            "Unit created successfully"
        )
    );
});

export const getAllUnits = asyncHandler(async (req, res) => {
    const allUnits = await getAllUnitsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            allUnits,
            "All units fetched successfully"
        )
    );
});

export const getUnitById = asyncHandler(async (req, res) => {
    const unit = await getUnitByIdService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            unit,
            "Unit fetched successfully"
        )
    );
});

export const updateUnit = asyncHandler(async (req, res) => {
    const updatedUnit = await updateUnitService({
        unitId: req.params.unitId,
        ...req.body
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUnit,
            "Unit updated successfully"
        )
    );
});

export const deleteUnit = asyncHandler(async (req, res) => {
    const deletedUnit = await deleteUnitService(req.params);

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedUnit,
            "Unit soft deleted successfully"
        )
    );
});
import { Unit } from "../models/unit.js";
import ApiError from "../utils/ApiError.js";

export const createUnitService = async (data) => {
    const { unitName, unitCode, description } = data;

    const existingUnit = await Unit.findOne({
        $or: [
            { unitName },
            { unitCode }
        ],
        isDeleted: false
    });

    if (existingUnit) {
        if (existingUnit.unitName === unitName) {
            throw new ApiError(
                409,
                "Unit with this name already exists"
            );
        }

        if (existingUnit.unitCode === unitCode) {
            throw new ApiError(
                409,
                "Unit with this code already exists"
            );
        }
    }

    try {
        const newUnit = await Unit.create({
            unitName,
            unitCode,
            description
        });

        return newUnit;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Unit already exists"
            );
        }

        throw error;
    }
};

export const getAllUnitsService = async () => {
    const allUnits = await Unit.find({
        isDeleted: false
    }).sort({
        unitName: 1
    });

    return allUnits;
};

export const getUnitByIdService = async (data) => {
    const { unitId } = data;

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

    return unit;
};

export const updateUnitService = async (data) => {
    const {
        unitId,
        unitName,
        unitCode,
        description,
        isActive
    } = data;

    const existingUnit = await Unit.findOne({
        _id: unitId,
        isDeleted: false
    });

    if (!existingUnit) {
        throw new ApiError(
            404,
            "Unit not found"
        );
    }

    if (unitName !== undefined) {
        const duplicateUnitName = await Unit.findOne({
            unitName,
            isDeleted: false,
            _id: {
                $ne: unitId
            }
        });

        if (duplicateUnitName) {
            throw new ApiError(
                409,
                "Unit with this name already exists"
            );
        }
    }

    if (unitCode !== undefined) {
        const duplicateUnitCode = await Unit.findOne({
            unitCode,
            isDeleted: false,
            _id: {
                $ne: unitId
            }
        });

        if (duplicateUnitCode) {
            throw new ApiError(
                409,
                "Unit with this code already exists"
            );
        }
    }

    const updatedData = {};

    if (unitName !== undefined) {
        updatedData.unitName = unitName;
    }

    if (unitCode !== undefined) {
        updatedData.unitCode = unitCode;
    }

    if (description !== undefined) {
        updatedData.description = description;
    }

    if (isActive !== undefined) {
        updatedData.isActive = isActive;
    }

    try {
        const updatedUnit = await Unit.findByIdAndUpdate(
            unitId,
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return updatedUnit;
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Unit already exists"
            );
        }

        throw error;
    }
};

export const deleteUnitService = async (data) => {
    const { unitId } = data;

    const existingUnit = await Unit.findOne({
        _id: unitId,
        isDeleted: false
    });

    if (!existingUnit) {
        throw new ApiError(
            404,
            "Unit not found"
        );
    }

    const deletedUnit = await Unit.findByIdAndUpdate(
        unitId,
        {
            isDeleted: true,
            isActive: false
        },
        {
            returnDocument: "after"
        }
    );

    return deletedUnit;
};
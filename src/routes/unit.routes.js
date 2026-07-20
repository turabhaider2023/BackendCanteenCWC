import express from "express";
import validate from "../middlewares/validate.js";

import {
    createUnitSchema,
    getAllUnitsSchema,
    getUnitByIdSchema,
    updateUnitSchema,
    deleteUnitSchema
} from "../schemas/unit.schema.js";

import {
    createUnit,
    getAllUnits,
    getUnitById,
    updateUnit,
    deleteUnit
} from "../controllers/unit.controller.js";

const unitRouter = express.Router();

unitRouter.post(
    "/",
    validate(createUnitSchema),
    createUnit
);

unitRouter.get(
    "/",
    validate(getAllUnitsSchema),
    getAllUnits
);

unitRouter.get(
    "/:unitId",
    validate(getUnitByIdSchema),
    getUnitById
);

unitRouter.put(
    "/:unitId",
    validate(updateUnitSchema),
    updateUnit
);

unitRouter.delete(
    "/:unitId",
    validate(deleteUnitSchema),
    deleteUnit
);

export default unitRouter;
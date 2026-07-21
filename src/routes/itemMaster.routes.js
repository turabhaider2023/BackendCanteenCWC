import express from "express";
import validate from "../middlewares/validate.js";

import {
    createItemMasterSchema,
    getAllItemMastersSchema,
    getItemMasterByIdSchema,
    updateItemMasterSchema,
    deleteItemMasterSchema
} from "../schemas/itemMaster.schema.js";

import {
    createItemMaster,
    getAllItemMasters,
    getItemMasterById,
    updateItemMaster,
    deleteItemMaster
} from "../controllers/itemMaster.controller.js";

const itemMasterRouter = express.Router();

itemMasterRouter.post(
    "/",
    validate(createItemMasterSchema),
    createItemMaster
);

itemMasterRouter.get(
    "/",
    validate(getAllItemMastersSchema),
    getAllItemMasters
);

itemMasterRouter.get(
    "/:itemMasterId",
    validate(getItemMasterByIdSchema),
    getItemMasterById
);

itemMasterRouter.put(
    "/:itemMasterId",
    validate(updateItemMasterSchema),
    updateItemMaster
);

itemMasterRouter.delete(
    "/:itemMasterId",
    validate(deleteItemMasterSchema),
    deleteItemMaster
);

export default itemMasterRouter;
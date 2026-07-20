import express from "express";
import validate from "../middlewares/validate.js";

import {
    createItemSchema,
    getAllItemsSchema,
    getItemByIdSchema,
    updateItemSchema,
    deleteItemSchema
} from "../schemas/item.schema.js";

import {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
} from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.post(
    "/",
    validate(createItemSchema),
    createItem
);

itemRouter.get(
    "/",
    validate(getAllItemsSchema),
    getAllItems
);

itemRouter.get(
    "/:itemId",
    validate(getItemByIdSchema),
    getItemById
);

itemRouter.put(
    "/:itemId",
    validate(updateItemSchema),
    updateItem
);

itemRouter.delete(
    "/:itemId",
    validate(deleteItemSchema),
    deleteItem
);

export default itemRouter;
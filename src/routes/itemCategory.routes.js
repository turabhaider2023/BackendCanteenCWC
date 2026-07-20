import express from "express";

import validate from "../middlewares/validate.js";

import {
    createItemCategorySchema,
    getAllItemCategoriesSchema,
    getItemCategoryByIdSchema,
    updateItemCategorySchema,
    deleteItemCategorySchema
} from "../schemas/itemCategory.schema.js";

import {
    createItemCategory,
    getAllItemCategories,
    getItemCategoryById,
    updateItemCategory,
    deleteItemCategory
} from "../controllers/itemCategory.controller.js";

const itemCategoryRouter = express.Router();

itemCategoryRouter.post(
    "/",
    validate(createItemCategorySchema),
    createItemCategory
);

itemCategoryRouter.get(
    "/",
    validate(getAllItemCategoriesSchema),
    getAllItemCategories
);

itemCategoryRouter.get(
    "/:itemCategoryId",
    validate(getItemCategoryByIdSchema),
    getItemCategoryById
);

itemCategoryRouter.put(
    "/:itemCategoryId",
    validate(updateItemCategorySchema),
    updateItemCategory
);

itemCategoryRouter.delete(
    "/:itemCategoryId",
    validate(deleteItemCategorySchema),
    deleteItemCategory
);

export default itemCategoryRouter;

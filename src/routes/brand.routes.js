import express from "express";
import validate from "../middlewares/validate.js"

import {
    createBrandSchema,
    getAllBrandsSchema,
    getBrandByIdSchema,
    updateBrandSchema,
    deleteBrandSchema
} from "../schemas/brand.schema.js"

import {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
} from "../controllers/brand.controller.js"

const brandRouter = express.Router()

brandRouter.post("/",validate(createBrandSchema),createBrand)
brandRouter.get("/",validate(getAllBrandsSchema),getAllBrands)
brandRouter.get("/:brandId",validate(getBrandByIdSchema),getBrandById)
brandRouter.put("/:brandId",validate(updateBrandSchema),updateBrand)
brandRouter.delete("/:brandId",validate(deleteBrandSchema),deleteBrand)

export default brandRouter;
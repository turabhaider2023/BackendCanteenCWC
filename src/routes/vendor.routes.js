import express from "express";
import validate from "../middlewares/validate.js"
import {
    createVendorSchema,
    getAllVendorsSchema,
    getVendorByIdSchema,
    updateVendorSchema,
    deleteVendorSchema
} from "../schemas/vendor.schema.js"

import {
    createVendor,
    getAllVendors,
    getVendorById,
    updateVendor,
    deleteVendor
} from "../controllers/vendor.controller.js"



const vendorRouter = express.Router()

vendorRouter.post("/",validate(createVendorSchema),createVendor)
vendorRouter.get("/",validate(getAllVendorsSchema),getAllVendors)
vendorRouter.get("/:vendorId",validate(getVendorByIdSchema),getVendorById)
vendorRouter.put("/:vendorId",validate(updateVendorSchema),updateVendor)
vendorRouter.delete("/:vendorId",validate(deleteVendorSchema),deleteVendor)

export default vendorRouter;


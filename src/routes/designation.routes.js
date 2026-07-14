import express from "express";
import validate from "../middlewares/validate.js";
import {createDesignationSchema,
    updateDesignationSchema,
    deleteDesignationSchema
} from "../schemas/designation.schema.js";

import {
    createDesignation,
    getAllDesignations,
    updateDesignation,
    deleteDesignation

} from "../controllers/designation.controller.js"

const designationRouter = express.Router()

designationRouter.post("/",validate(createDesignationSchema),createDesignation);
designationRouter.get("/",getAllDesignations)
designationRouter.put("/:designationId",validate(updateDesignationSchema),updateDesignation)
designationRouter.delete("/:designationId",validate(deleteDesignationSchema),deleteDesignation)

export default designationRouter;
import express from "express";

import {
    createDesignation,
    getAllDesignations,
    updateDesignation,
    deleteDesignation

} from "../controllers/designation.controller.js"

const designationRouter = express.Router()

designationRouter.post("/",createDesignation);
designationRouter.get("/",getAllDesignations)
designationRouter.put("/:designationId",updateDesignation)
designationRouter.delete("/:designationId",deleteDesignation)

export default designationRouter;
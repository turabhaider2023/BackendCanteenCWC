import express from "express";

import {
    createDesignation,
    getAllDesignations
} from "../controllers/designation.controller.js"

const designationRouter = express.Router()

designationRouter.post("/",createDesignation);
designationRouter.get("/",getAllDesignations)

export default designationRouter;
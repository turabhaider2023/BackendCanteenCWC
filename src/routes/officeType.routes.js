import express from "express";
import {
    createOfficeTypeSchema,
    updateOfficeTypeSchema,
    deleteOfficeTypeSchema
} from "../schemas/officeType.schema.js"

import validate from "../middlewares/validate.js"

import {
    createOfficeType,
    getAllOfficeTypes,
    updateOfficeType,
    deleteOfficeType} from "../controllers/officeType.controller.js"

const officeTypeRouter = express.Router()

officeTypeRouter.post("/",validate(createOfficeTypeSchema),createOfficeType)
officeTypeRouter.get("/",getAllOfficeTypes)
officeTypeRouter.put("/:officeTypeId",validate(updateOfficeTypeSchema),updateOfficeType)
officeTypeRouter.delete("/:officeTypeId",validate(deleteOfficeTypeSchema),deleteOfficeType)





export default officeTypeRouter;

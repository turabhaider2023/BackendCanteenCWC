import express from "express";
import {
    createOfficeSchema,
    updateOfficeSchema,
    deleteOfficeSchema
} from "../schemas/office.schema.js"

import validate from "../middlewares/validate.js";
import {createOffice
    ,getAllOffices,
    updateOffice
    ,deleteOffice} from "../controllers/office.controller.js"

const officeRouter = express.Router()

officeRouter.post("/",validate(createOfficeSchema),createOffice)
officeRouter.get("/",getAllOffices)
officeRouter.put("/:officeId",validate(updateOfficeSchema),updateOffice)
officeRouter.delete("/:officeId",validate(deleteOfficeSchema),deleteOffice)

export default officeRouter;
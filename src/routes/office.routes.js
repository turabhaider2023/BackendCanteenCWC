import express from "express";
import {createOffice
    ,getAllOffices,
    updateOffice
    ,deleteOffice} from "../controllers/office.controller.js"

const officeRouter = express.Router()

officeRouter.post("/",createOffice)
officeRouter.get("/",getAllOffices)
officeRouter.put("/:officeId",updateOffice)
officeRouter.delete("/:officeId",deleteOffice)

export default officeRouter;
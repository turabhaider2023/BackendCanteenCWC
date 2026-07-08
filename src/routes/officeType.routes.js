import express from "express";
import {
    createOfficeType,
    getAllOfficeTypes,
    updateOfficeType,
    deleteOfficeType} from "../controllers/officeType.controller.js"

const officeTypeRouter = express.Router()

officeTypeRouter.post("/",createOfficeType)
officeTypeRouter.get("/",getAllOfficeTypes)
officeTypeRouter.put("/:officeTypeId",updateOfficeType)
officeTypeRouter.delete("/:officeTypeId",deleteOfficeType)





export default officeTypeRouter;

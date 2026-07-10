import express from "express"
import {createRole
    ,getAllRoles
,updateRole
,deleteRole} from "../controllers/role.controller.js"

const roleRouter = express.Router()

roleRouter.post("/",createRole)
roleRouter.get("/",getAllRoles)
roleRouter.put("/:roleId",updateRole)
roleRouter.delete("/:roleId",deleteRole)

export default roleRouter;
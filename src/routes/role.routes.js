import express from "express"
import {createRoleSchema,
    updateRoleSchema,
    deleteRoleSchema
} from "../schemas/role.schema.js"
import validate from "../middlewares/validate.js"
import {createRole
    ,getAllRoles
,updateRole
,deleteRole} from "../controllers/role.controller.js"

const roleRouter = express.Router()

roleRouter.post("/",validate(createRoleSchema),createRole)
roleRouter.get("/",getAllRoles)
roleRouter.put("/:roleId",validate(updateRoleSchema),updateRole)
roleRouter.delete("/:roleId",validate(deleteRoleSchema),deleteRole)

export default roleRouter;
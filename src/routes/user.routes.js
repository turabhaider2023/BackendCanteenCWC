import express from "express";
import {createUserSchema,
    getUserByIdSchema,
    updateUserSchema,
    deleteUserSchema
} from "../schemas/user.schema.js"

import validate from "../middlewares/validate.js"
import {createUser
    ,getAllUsers
    ,getUserById
    ,updateUser
    ,deleteUser
} from "../controllers/user.controller.js"

const userRouter = express.Router()


userRouter.post("/",validate(createUserSchema),createUser)
userRouter.get("/",getAllUsers)
userRouter.get("/:userId",validate(getUserByIdSchema),getUserById)
userRouter.put("/:userId",validate(updateUserSchema),updateUser)
userRouter.delete("/:userId",validate(deleteUserSchema),deleteUser)

export default userRouter;
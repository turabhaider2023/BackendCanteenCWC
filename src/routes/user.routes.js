import express from "express";
import {createUser
    ,getAllUsers
    ,getUserById
    ,updateUser
    ,deleteUser
} from "../controllers/user.controller.js"

const userRouter = express.Router()


userRouter.post("/",createUser)
userRouter.get("/",getAllUsers)
userRouter.get("/:userId",getUserById)
userRouter.put("/:userId",updateUser)
userRouter.delete("/:userId",deleteUser)

export default userRouter;
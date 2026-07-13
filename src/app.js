import express from "express";
import designationRouter from "./routes/designation.routes.js"
import officeTypeRouter from "./routes/officeType.routes.js"
import officeRouter from "./routes/office.routes.js"
import roleRouter from "./routes/role.routes.js"
import userRouter from "./routes/user.routes.js"
import notFound from "./middlewares/notFound.js"
import errorHandler from "./middlewares/errorHandler.js"
const app = express()


app.use(express.json())

app.use("/api/v1/designations",designationRouter)
app.use("/api/v1/officeType",officeTypeRouter)
app.use("/api/v1/offices",officeRouter)
app.use("/api/v1/roles",roleRouter)
app.use("/api/v1/users",userRouter)

app.use(notFound)
app.use(errorHandler)

export default app;
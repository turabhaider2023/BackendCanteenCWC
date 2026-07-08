import express from "express";
import designationRouter from "./routes/designation.routes.js"
import officeTypeRouter from "./routes/officeType.routes.js"
const app = express()


app.use(express.json())

app.use("/api/v1/designations",designationRouter)
app.use("/api/v1/officeType",officeTypeRouter)

export default app;
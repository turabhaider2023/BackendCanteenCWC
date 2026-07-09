import express from "express";
import designationRouter from "./routes/designation.routes.js"
import officeTypeRouter from "./routes/officeType.routes.js"
import officeRouter from "./routes/office.routes.js"
const app = express()


app.use(express.json())

app.use("/api/v1/designations",designationRouter)
app.use("/api/v1/officeType",officeTypeRouter)
app.use("/api/v1/offices",officeRouter)

export default app;
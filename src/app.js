import express from "express";
import designationRouter from "./routes/designation.routes.js"

const app = express()


app.use(express.json())

app.use("/api/v1/designations",designationRouter)

export default app;
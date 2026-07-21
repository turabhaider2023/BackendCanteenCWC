import express from "express";
import designationRouter from "./routes/designation.routes.js"
import officeTypeRouter from "./routes/officeType.routes.js"
import officeRouter from "./routes/office.routes.js"
import roleRouter from "./routes/role.routes.js"
import userRouter from "./routes/user.routes.js"
import vendorRouter from "./routes/vendor.routes.js"
import itemCategoryRouter from "./routes/itemCategory.routes.js"
import unitRouter from "./routes/unit.routes.js";
import itemRouter from "./routes/item.routes.js";
import brandRouter from "./routes/brand.routes.js"
import itemMasterRouter from "./routes/itemMaster.routes.js";

import notFound from "./middlewares/notFound.js"
import errorHandler from "./middlewares/errorHandler.js"

const app = express()


app.use(express.json())

app.use("/api/v1/designations",designationRouter)
app.use("/api/v1/officeTypes",officeTypeRouter)
app.use("/api/v1/offices",officeRouter)
app.use("/api/v1/roles",roleRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/vendors",vendorRouter)
app.use("/api/v1/itemCategories",itemCategoryRouter)
app.use("/api/v1/units", unitRouter)
app.use("/api/v1/items", itemRouter)
app.use("/api/v1/brands",brandRouter)
app.use("/api/v1/itemMasters",itemMasterRouter)


app.use(notFound)
app.use(errorHandler)

export default app;
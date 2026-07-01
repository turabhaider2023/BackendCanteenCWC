import dotenv from "dotenv"

dotenv.config()

import app from "./app.js"
import {connectDB} from "./config/database.js"



const PORT = process.env.PORT;

const connectToServer = async()=>{
        try {
            await connectDB()
            app.listen(PORT,()=>{
                console.log(`the server is listening at port ${PORT}`)
            })
        } catch (error) {
            console.error("error in the sever connection: ",error)
            process.exit(1)
            
        }
}

connectToServer()
import "./config/env.js";
import app from "./app.js"
import {connectDB} from "./config/database.js"



const PORT = process.env.PORT||3000;

const connectToServer = async()=>{
        try {
            await connectDB()
            app.listen(PORT,()=>{
                console.log(`the server is listening at port ${PORT}`)
                console.log(
                        `health check: http://localhost:${PORT}/api/v1/health`
                );
            })
        } catch (error) {
            console.error("error in the server connection: ",error)
            process.exit(1)
            
        }
}

connectToServer()
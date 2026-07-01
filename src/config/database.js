import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("successfully connected to the database")
    } catch (error) {
        console.error("database connection failed: ",error)
        process.exit(1)
    }
}
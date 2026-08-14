import express from "express";
import mongoose from "mongoose";

import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"

const router = express.Router()

const DB_STATE = {
    0:"disconnected",
    1:"connected",
    2:"connecting",
    3:"disconnecting"
}

router.get("/",asyncHandler(
    async(req,res)=>{
        const state = mongoose.connection.readyState;

        res.status(200).json(
           new ApiResponse(
                200,
                {
                    service:"canteenCWC",
                    status:"ok",
                    uptimeSeconds:Math.round(process.uptime()),
                    database:{
                        state:DB_STATE[state] ?? "unknown",
                        name:mongoose.connection.name ?? null
                    },
                    timestamp: new Date().toISOString(),


                },
                "Canteencwc backend is running"

            )
        
    )
    
}))

export default router;
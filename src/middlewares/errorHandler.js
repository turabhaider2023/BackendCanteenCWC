import ApiError from "../utils/ApiError.js"

const errorHandler = (error,req,res,next)=>{
    if(error instanceof ApiError){
        return res.status(error.statusCode).json({
            success:error.success,
            message:error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
}

export default errorHandler;
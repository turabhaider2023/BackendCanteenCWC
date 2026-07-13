import ApiError from "../utils/ApiError.js";

const notFound = (req,res,next)=>{
    const error= new ApiError(
        404,
        `Route not found ${req.originalUrl}`
    )

    next(error)
}

export default notFound;
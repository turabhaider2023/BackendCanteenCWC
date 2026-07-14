import ApiError from "../utils/ApiError.js";
import { ZodError } from "zod";

const validate = (schema)=>{
    return (req,res,next)=>{
        try {
            schema.parse({
                body:req.body,
                params:req.params,
                query:req.query
            })

            return next()
        } catch (error) {
            if(error instanceof ZodError){
                throw new ApiError(
                    400,
                    error.issues[0].message
                )
            }

            return next(error)
        }
    }
}

export default validate;
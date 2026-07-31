import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });

            req.body = validatedData.body;
            req.params = validatedData.params;
            req.query = validatedData.query;

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(
                        400,
                        error.issues[0].message
                    )
                );
            }

            return next(error);
        }
    };
};


export default validate;
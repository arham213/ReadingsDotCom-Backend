import { failureResponse } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
    console.log(`[ERROR] ${err.message}`);

    const statusCode = err.statusCode || 500;

    return failureResponse(res, err, statusCode);
}
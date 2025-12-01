import { failureResponse } from "../utils/response.js";

export const authorizeRoles = (...allowedRoles) => {
    console.log('checking roles')
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return failureResponse(res, "Forbidden: You don't have permission to access this resource.", 403);
        }
        console.log('Authrorized')
        next();
    }
}
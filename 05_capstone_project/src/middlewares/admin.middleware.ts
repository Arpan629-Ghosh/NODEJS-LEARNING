import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";


export function requireAdmin(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    if(req.user?.role !== "Admin"){
        next(new AppError(403, "User is not allow to this feature!"));
        return;
    }

    next();
}
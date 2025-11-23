import { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"
export const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['next-auth.session-token']
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        next();
    } catch (error) {
        next(error);
    }
}
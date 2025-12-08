"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const VerifyToken = async (req, res, next) => {
    try {
        const token = req.cookies['next-auth.session-token'];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.VerifyToken = VerifyToken;

import { Request, Response, NextFunction } from "express"
import ApplicationModel from "./applicationModel";
export const UserApplicationByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const { email } = req.params;
        const application = await ApplicationModel.find({ email: email })
            .lean()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await ApplicationModel.countDocuments({ email: email });

        res.status(200).send({ message: "User Application Find Successfully!", application, total: Math.ceil(total / limit) });
    } catch (error) {
        next(error)
    }
}
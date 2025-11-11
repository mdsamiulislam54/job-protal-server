import { Request, Response, NextFunction } from "express"
import ApplicationModel from "./applicationModel";
export const UserApplicationByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        const application = await ApplicationModel.find({ email: email }).lean();
        res.status(200).send({ message: "User Application Find Successfully!", application })
    } catch (error) {
        next(error)
    }
}
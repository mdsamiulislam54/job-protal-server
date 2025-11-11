import { Request, Response, NextFunction } from "express"
import ApplicationModel from "../../models/ApplicationModel/applicationModel";
export const UserApplicationDeleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await ApplicationModel.deleteOne({ _id: id });
        res.status(200).send({ "message": "Application deleted successfully", result })
    } catch (error) {
        next(error)
    }
}
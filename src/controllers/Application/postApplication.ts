import { Request, Response, NextFunction } from "express"
import ApplicationModel from "../../models/ApplicationModel/applicationModel";
export const PostApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const applicationData = req.body;
        const application = await ApplicationModel.insertOne(applicationData);

        res.status(200).send({ message: "Application posted Successfully!", application })

    } catch (error) {
        next(error)
    }
}
import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel";


export const PostJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobsData = req.body;
        const jobs = await JobsModel.insertOne(jobsData);
        res.status(200).send({ message: "Jobs Insert Successfully!", jobs });
    } catch (error) {
        next(error)
    }
}
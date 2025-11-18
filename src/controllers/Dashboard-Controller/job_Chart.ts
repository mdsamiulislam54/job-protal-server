import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel";

export const JobChart = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = await JobsModel.aggregate([
            {
                $group: {
                    _id: "$title",         
                    totalJobs: { $sum: 1 }   
                }
            },
            {
                $project: {
                    _id: 0,
                    title: "$_id",
                    totalJobs: 1
                }
            }
        ]);

        res.status(200).send({
            success: true,
            message: "Job chart data fetched",
            data
        });

    } catch (error) {
        console.log(error)
        next(error);
    }
}

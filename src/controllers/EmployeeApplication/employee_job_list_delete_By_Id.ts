import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel";

export const EmployeeJobsListDeleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await JobsModel.deleteOne({ _id: id });
        console.log(result)
        res.status(200).send({ "message": "Application deleted successfully", result })
    } catch (error) {
        next(error)
    }
}
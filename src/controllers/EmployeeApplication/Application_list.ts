import { Request, Response, NextFunction } from "express"
import ApplicationModel from "../../models/ApplicationModel/applicationModel";
export const Employee_jobs_List = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10;
        const { email } = req.params;

        const query: any = {employeeEmail: email};
        const total = await ApplicationModel.countDocuments(query);
        const jobs = await ApplicationModel.find(query).skip((page -1) * limit).limit(limit).lean().sort({ createdAt: -1 })
        // console.log(jobs)
        res.status(200).send({
             message: "Employee Jobs List Found Successfully!", 
             jobs,
             total: Math.floor(total / limit)

             })
    } catch (error) {
        next(error)
    }
}
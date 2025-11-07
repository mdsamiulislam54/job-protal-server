import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel"
export const GetLatestJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await JobsModel.find().sort({ postedDate: -1 }).limit(10).lean()
        const jobsData = jobs.map((item) => ({
            _id: item._id,
            salaryRange:`৳ ${item.salaryRange.min} — ${item.salaryRange.max}`,
            title: item.title,
            logo: item.companyLogo,
            postedDate: item.postedDate,
            deadline: item.deadline,
            jobType: item.jobType,
            location: item.location,
        }));
        res.status(200).send({ message: "Latest Data get Successfully", jobs: jobsData })
    } catch (error) {
        next(error)
    }
}
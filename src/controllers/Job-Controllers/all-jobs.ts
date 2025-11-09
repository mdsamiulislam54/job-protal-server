import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel"
export const AllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const category = (req.query.category as string) || "All"

        const filter: any = {}
        if (category !== "All") {
            filter.category = category
        }

        const total = await JobsModel.countDocuments(filter);
        const jobs = await JobsModel.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);

        const jobsData = jobs.map((item) => ({
            _id: item._id,
            salaryRange: `৳ ${item.salaryRange.min} — ${item.salaryRange.max}`,
            title: item.title,
            logo: item.companyLogo,
            postedDate: item.postedDate,
            deadline: item.deadline,
            jobType: item.jobType,
            location: item.location,
        }));

        res.status(200).json({
            success: true,
            total: Math.floor(total / limit),
            jobsData,
        })


    } catch (error) {

    }
}
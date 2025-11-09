import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel"

export const AllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const category = (req.query.category as string) || "All"
        const filterData = JSON.parse(req.query.filter as string) || {}
        const { search, location, min, max } = filterData


        const query: any = {}
        if (category !== "All") {
            query.category = category
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { jobDescription: { $regex: search, $options: "i" } }
            ]
        }

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }


        if (min && max) {
            if (min && max) {
                const minSalary = Number(min);
                const maxSalary = Number(max);
                query['salaryRange.min'] = { $gte: minSalary };
                query['salaryRange.max'] = { $lte: maxSalary };
            }

        }

        // const aggregationPipeline = [
        //     { $query: query },
        //     { $sort: { createdAt: -1 as -1 } },
        //     { $skip: (page - 1) * limit },
        //     { $limit: limit }
        // ]



        const [jobs, total, uniqueCategory, uniqueLocation] = await Promise.all([
            JobsModel.find(query).sort({createdAt: -1 }).limit((page -1)* limit).limit(limit),
            JobsModel.countDocuments(query),
        
            JobsModel.distinct("category"),
            JobsModel.distinct("location"),
        ])
     
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
            uniqueCategory,
            uniqueLocation
        })


    } catch (error) {
        next(error)
    }
}
import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel";
export const Posted_All_Jobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10;
        const sort = req.query.sort ?? "all"

        const query: any = { contactEmail: email };


        if (sort !== 'all' && sort !== "old" && sort !== "latest") {
            query.status = { $regex: sort, $options: "i" };
        }

        let sortOption: any = { createdAt: -1 };
        if (sort === "old") sortOption = { createdAt: 1 };

        const total = await JobsModel.countDocuments(query)
        const jobs = await JobsModel.find(query, "title companyLogo category salaryRange postedDate deadline status createdAt", query)
            .sort(sortOption).lean().skip((page - 1) * limit).limit(limit);


        res.status(200).send({
            message: "All Jobs Find Successfully!",
            total: Math.floor(total / limit),
            jobs: jobs

        })
    } catch (error) {
        next(error)
    }
}
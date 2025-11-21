import { Request, Response, NextFunction } from "express"
import JobsModel from "../../models/JobModel/jobModel"
export const CompanyList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const pipeline = [
            { $group: { _id: "$companyName", logo: { $first: "$companyLogo" }, location: { $first: "$location" } } },
            { $project: { _id: 0, companyName: "$_id", logo: 1, location: 1 } }
        ]

        const companies = await JobsModel.aggregate([...pipeline, { $skip: (page - 1) * limit }, { $limit: limit }]);

        const totalCompanies = await JobsModel.aggregate([...pipeline, { $count: "total" }]);
        const total = totalCompanies[0]?.total || 0;


        res.status(200).send({
            companies,
            total: Math.ceil(total / limit),
        })
    } catch (error) {
        next(error)
    }
}
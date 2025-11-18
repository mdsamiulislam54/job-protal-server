import { Request, Response, NextFunction } from "express"
import ApplicationModel from "../../models/ApplicationModel/applicationModel"
export const LatestApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10;
        const sort = req.query.sort || "all"
        let sortOption: any = {}
        let filter: any = {}
        // Determine sort option
        switch (sort) {
            case "all":
                sortOption = {}
                break
            case "latest":
                sortOption = {
                    createdAt: -1
                }
                break
            case "older":
                sortOption = {
                    createdAt: 1
                }
                break

            case "pending":
                filter = { status: "pending" } 
                sortOption = { createdAt: -1 } 
                break
            case "accepted":
                filter = { status: "accepted" } 
                break
            default:
                sortOption = {
                    createdAt: -1
                }
        }

      
        const total = await ApplicationModel.countDocuments(filter)
        const application = await ApplicationModel.find(filter).sort(sortOption).skip((page - 1) * limit).limit(limit);
        res.setHeader("Cache-Control", "no-store")
        res.status(200).send({
            message: "All Application Find Successfully!",
            totalPage: Math.ceil(total / limit),
            application: application,
        })
    } catch (error) {
        next(error)
    }
}
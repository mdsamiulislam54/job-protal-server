import { Request, Response, NextFunction } from "express"
import ApplicationModel from "../../models/ApplicationModel/applicationModel"
export const PendingApplicationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        const pendingApplication = await ApplicationModel.find({ status: 'pending' })
        .lean()
        .sort({createdAt: -1})
        .skip((page -1)*limit)
        .limit(limit)

    
        const total = await ApplicationModel.countDocuments({status:'pending'})

        res.status(200).send({
            message:"Pending application find successfully",
            pendingApplication,
            total: Math.ceil(total / limit)
        })
    } catch (error) {
        next(error)
    }
}
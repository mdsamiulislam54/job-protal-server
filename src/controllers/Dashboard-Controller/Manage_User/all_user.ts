import { Request, Response ,NextFunction} from "express"
import UserModel from "../../../models/UserModel/userModel"
export const GetAllUser = async (req:Request, res:Response, next:NextFunction) =>{
    try {
         const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const user = await UserModel.find().lean().sort({createdAt: -1}).skip((page -1)* limit).limit(limit)
        const total = await UserModel.countDocuments();
        res.status(200).send({
            message:"All user Find Successfully",
            total:Math.ceil(total/ limit),
            user:user
        })
    } catch (error) {
        next(error)
    }
}
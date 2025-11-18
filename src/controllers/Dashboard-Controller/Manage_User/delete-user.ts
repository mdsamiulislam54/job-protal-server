import { Request, Response ,NextFunction} from "express"
import UserModel from "../../../models/UserModel/userModel"
export const AdminUserDelete = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const {id} = req.params;
        const user = await UserModel.deleteOne({_id:id});
        res.status(200).send({
            message:"User delete successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}
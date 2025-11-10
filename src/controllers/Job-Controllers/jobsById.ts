
import { Request, Response ,NextFunction} from "express"
import JobsModel from "../../models/JobModel/jobModel";
export const JobDetailsById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const {id} = req.params;
        const job = await JobsModel.findOne({_id: id});
        res.status(200).send({message:"Successfully", job})
    } catch (error) {
        next(error)
    }
}
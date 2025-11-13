import { Request, Response ,NextFunction} from "express"
import ApplicationModel from "../../models/ApplicationModel/applicationModel";
export const Employee_jobs_List = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const {email} = req.params;
        console.log(email)
        const jobs = await ApplicationModel.find({employeeEmail: email}).lean().sort({createdAt: -1});
        // console.log(jobs)
        res.status(200).send({message:"Employee Jobs List Found Successfully!", jobs})
    } catch (error) {
        next(error)
    }
}
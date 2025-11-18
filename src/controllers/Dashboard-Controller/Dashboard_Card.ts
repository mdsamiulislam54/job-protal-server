import { Request, Response, NextFunction } from "express";
import JobsModel from "../../models/JobModel/jobModel";
import UserModel from "../../models/UserModel/userModel";
import ApplicationModel from "../../models/ApplicationModel/applicationModel";

export const DashboardCardData = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const job = JobsModel.countDocuments();
        const user = UserModel.countDocuments({ role: { $in: ['user'] } });
        const employee = UserModel.countDocuments({ role: { $in: ['employee'] } });
        const application = ApplicationModel.countDocuments();

        const [
            totalJobs,
            totalUser,
            totalEmployee,
            totalApplication
        ] = await Promise.all([job, user, employee, application]);

        res.status(200).json({
            message: "All documents counted successfully",
            totalJobs,
            totalApplication,
            totalEmployee,
            totalUser
        });

    } catch (error) {
        next(error);
    }
};

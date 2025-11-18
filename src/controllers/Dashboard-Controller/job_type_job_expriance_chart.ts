import { Request, Response, NextFunction } from "express";
import JobsModel from "../../models/JobModel/jobModel";

export const JobTypeAndExperience = async (req: Request, res: Response, next: NextFunction) => {
 try {
    const [experienceData, jobTypeData, salaryData] = await Promise.all([
      // Jobs by Experience Level
      JobsModel.aggregate([
        { $group: { _id: "$experienceLevel", totalJobs: { $sum: 1 } } },
        { $project: { _id: 0, experienceLevel: "$_id", totalJobs: 1 } },
      ]),

      // Jobs by Job Type
      JobsModel.aggregate([
        { $group: { _id: "$jobType", totalJobs: { $sum: 1 } } },
        { $project: { _id: 0, jobType: "$_id", totalJobs: 1 } },
      ]),

      // Jobs by Salary Range
      JobsModel.aggregate([
        {
          $project: {
            salaryRange: {
              $concat: [
                { $toString: "$salaryRange.min" },
                "-",
                { $toString: "$salaryRange.max" },
              ],
            },
          },
        },
        {
          $group: {
            _id: "$salaryRange",
            totalJobs: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            salaryRange: "$_id",
            totalJobs: 1,
          },
        },
        { $sort: { salaryRange: 1 } },
      ]),
    ]);

    res.status(200).send({
      success: true,
      message: "Jobs chart data fetched successfully",
      data: {
        experience: experienceData,
        jobType: jobTypeData,
        salaryRange: salaryData,
      },
    });
  } catch (error) {
    next(error);
  }
};

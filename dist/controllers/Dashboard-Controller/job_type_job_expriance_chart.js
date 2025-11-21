"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTypeAndExperience = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const JobTypeAndExperience = async (req, res, next) => {
    try {
        const [experienceData, jobTypeData, salaryData] = await Promise.all([
            // Jobs by Experience Level
            jobModel_1.default.aggregate([
                { $group: { _id: "$experienceLevel", totalJobs: { $sum: 1 } } },
                { $project: { _id: 0, experienceLevel: "$_id", totalJobs: 1 } },
            ]),
            // Jobs by Job Type
            jobModel_1.default.aggregate([
                { $group: { _id: "$jobType", totalJobs: { $sum: 1 } } },
                { $project: { _id: 0, jobType: "$_id", totalJobs: 1 } },
            ]),
            // Jobs by Salary Range
            jobModel_1.default.aggregate([
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
    }
    catch (error) {
        next(error);
    }
};
exports.JobTypeAndExperience = JobTypeAndExperience;

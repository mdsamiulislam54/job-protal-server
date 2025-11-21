"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobChart = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const JobChart = async (req, res, next) => {
    try {
        const data = await jobModel_1.default.aggregate([
            {
                $group: {
                    _id: "$title",
                    totalJobs: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: "$_id",
                    totalJobs: 1
                }
            }
        ]);
        res.status(200).send({
            success: true,
            message: "Job chart data fetched",
            data
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.JobChart = JobChart;

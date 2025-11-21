"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsPerMonth = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const JobsPerMonth = async (req, res, next) => {
    try {
        // Optional: Get month and year from query params or default to current month
        const { month, year } = req.query;
        const now = new Date();
        const targetYear = year ? Number(year) : now.getFullYear();
        const targetMonth = month ? Number(month) - 1 : now.getMonth(); // 0-based
        const startDate = new Date(targetYear, targetMonth, 1);
        const endDate = new Date(targetYear, targetMonth, 30, 23, 59, 59); // 1–30 inclusive
        const data = await jobModel_1.default.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                        $type: "date", // Only valid dates
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalJobs: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    totalJobs: 1,
                },
            },
            { $sort: { date: 1 } },
        ]);
        res.status(200).send({
            success: true,
            message: "Jobs per day fetched successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.JobsPerMonth = JobsPerMonth;

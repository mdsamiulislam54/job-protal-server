"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLatestJobs = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const GetLatestJobs = async (req, res, next) => {
    try {
        const jobs = await jobModel_1.default.find().sort({ createdAt: -1 }).limit(10).lean();
        const jobsData = jobs.map((item) => ({
            _id: item._id,
            salaryRange: `৳ ${item.salaryRange.min} — ${item.salaryRange.max}`,
            title: item.title,
            logo: item.companyLogo,
            postedDate: item.postedDate,
            deadline: item.deadline,
            jobType: item.jobType,
            location: item.location,
        }));
        res.status(200).send({ message: "Latest Data get Successfully", jobs: jobsData });
    }
    catch (error) {
        next(error);
    }
};
exports.GetLatestJobs = GetLatestJobs;

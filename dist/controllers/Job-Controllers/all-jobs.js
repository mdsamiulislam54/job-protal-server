"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllJobs = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const AllJobs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filterData = JSON.parse(req.query.filter) || {};
        const { search, location, min, max, category, job_type } = filterData;
        console.log(job_type);
        const query = {};
        if (category !== "All") {
            query.category = { $regex: category, $options: "i" };
        }
        if (job_type !== "all") {
            query.jobType = { $regex: job_type, $options: "i" };
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { jobDescription: { $regex: search, $options: "i" } }
            ];
        }
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }
        if (min && max) {
            if (min && max) {
                const minSalary = Number(min);
                const maxSalary = Number(max);
                query['salaryRange.min'] = { $gte: minSalary };
                query['salaryRange.max'] = { $lte: maxSalary };
            }
        }
        const [jobs, total, uniqueCategory, uniqueLocation] = await Promise.all([
            jobModel_1.default.find(query).skip((page - 1) * limit).limit(limit),
            jobModel_1.default.countDocuments(query),
            jobModel_1.default.distinct("category"),
            jobModel_1.default.distinct("location"),
        ]);
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
        res.status(200).json({
            success: true,
            total: Math.floor(total / limit),
            jobsData,
            uniqueCategory,
            uniqueLocation
        });
    }
    catch (error) {
        next(error);
    }
};
exports.AllJobs = AllJobs;

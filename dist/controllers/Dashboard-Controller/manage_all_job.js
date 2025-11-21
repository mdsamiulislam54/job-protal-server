"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageAllJobs = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const ManageAllJobs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filterData = req.query.sort || 'all';
        let query = {};
        let sortOption = { postedDate: -1 }; // default latest sort
        // const filterType =
        //     filterData.pending ? "pending" :
        //         filterData.accepts ? "accepts" :
        //             filterData.latest ? "latest" :
        //                 filterData.old ? "old" :
        //                     filterData.lowPrice ? "lowPrice" :
        //                         filterData.highPrice ? "highPrice" :
        //                             "default"
        // SWITCH START
        switch (filterData) {
            case "pending":
                query.status = "pending";
                break;
            case "accepts":
                query.status = "accepted";
                break;
            case "latest":
                sortOption = { createdAt: -1 };
                break;
            case "old":
                sortOption = { createdAt: 1 };
                break;
            case "lowPrice":
                sortOption = { "salaryRange.min": 1 };
                break;
            case "highPrice":
                sortOption = { "salaryRange.max": -1 };
                break;
            default:
                query = {};
                sortOption = { postedDate: -1 };
                break;
        }
        // SWITCH END
        const [jobs, total] = await Promise.all([
            jobModel_1.default.find(query)
                .sort(sortOption)
                .skip((page - 1) * limit)
                .limit(limit),
            jobModel_1.default.countDocuments(query),
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
            status: item.status,
        }));
        res.status(200).send({
            jobs: jobsData,
            page,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.ManageAllJobs = ManageAllJobs;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posted_All_Jobs = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const Posted_All_Jobs = async (req, res, next) => {
    try {
        const { email } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort ?? "all";
        const query = { contactEmail: email };
        if (sort !== 'all' && sort !== "old" && sort !== "latest") {
            query.status = { $regex: sort, $options: "i" };
        }
        let sortOption = { createdAt: -1 };
        if (sort === "old")
            sortOption = { createdAt: 1 };
        const total = await jobModel_1.default.countDocuments(query);
        const jobs = await jobModel_1.default.find(query, "title companyLogo category salaryRange postedDate deadline status createdAt", query)
            .sort(sortOption).lean().skip((page - 1) * limit).limit(limit);
        res.status(200).send({
            message: "All Jobs Find Successfully!",
            total: Math.floor(total / limit),
            jobs: jobs
        });
    }
    catch (error) {
        next(error);
    }
};
exports.Posted_All_Jobs = Posted_All_Jobs;

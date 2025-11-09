"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostJobs = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const PostJobs = async (req, res, next) => {
    try {
        const jobsData = req.body;
        const jobs = await jobModel_1.default.insertOne(jobsData);
        res.status(200).send({ message: "Jobs Insert Successfully!", jobs });
    }
    catch (error) {
        next(error);
    }
};
exports.PostJobs = PostJobs;

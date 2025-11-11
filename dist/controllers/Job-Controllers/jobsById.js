"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDetailsById = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const JobDetailsById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobModel_1.default.findOne({ _id: id });
        res.status(200).send({ message: "Successfully", job });
    }
    catch (error) {
        next(error);
    }
};
exports.JobDetailsById = JobDetailsById;

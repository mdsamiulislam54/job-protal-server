"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeJobsListDeleteById = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const EmployeeJobsListDeleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await jobModel_1.default.deleteOne({ _id: id });
        console.log(result);
        res.status(200).send({ "message": "Application deleted successfully", result });
    }
    catch (error) {
        next(error);
    }
};
exports.EmployeeJobsListDeleteById = EmployeeJobsListDeleteById;

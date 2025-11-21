"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee_jobs_List = void 0;
const applicationModel_1 = __importDefault(require("../../models/ApplicationModel/applicationModel"));
const Employee_jobs_List = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { email } = req.params;
        const query = { employeeEmail: email };
        const total = await applicationModel_1.default.countDocuments(query);
        const jobs = await applicationModel_1.default.find(query).skip((page - 1) * limit).limit(limit).lean().sort({ createdAt: -1 });
        // console.log(jobs)
        res.status(200).send({
            message: "Employee Jobs List Found Successfully!",
            jobs,
            total: Math.floor(total / limit)
        });
    }
    catch (error) {
        next(error);
    }
};
exports.Employee_jobs_List = Employee_jobs_List;

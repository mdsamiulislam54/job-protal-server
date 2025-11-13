"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee_jobs_List = void 0;
const applicationModel_1 = __importDefault(require("../../models/ApplicationModel/applicationModel"));
const Employee_jobs_List = async (req, res, next) => {
    try {
        const { email } = req.params;
        console.log(email);
        const jobs = await applicationModel_1.default.find({ employeeEmail: email }).lean().sort({ createdAt: -1 });
        // console.log(jobs)
        res.status(200).send({ message: "Employee Jobs List Found Successfully!", jobs });
    }
    catch (error) {
        next(error);
    }
};
exports.Employee_jobs_List = Employee_jobs_List;

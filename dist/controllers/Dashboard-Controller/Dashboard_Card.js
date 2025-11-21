"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardCardData = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const userModel_1 = __importDefault(require("../../models/UserModel/userModel"));
const applicationModel_1 = __importDefault(require("../../models/ApplicationModel/applicationModel"));
const DashboardCardData = async (req, res, next) => {
    try {
        const job = jobModel_1.default.countDocuments();
        const user = userModel_1.default.countDocuments({ role: { $in: ['user'] } });
        const employee = userModel_1.default.countDocuments({ role: { $in: ['employee'] } });
        const application = applicationModel_1.default.countDocuments();
        const [totalJobs, totalUser, totalEmployee, totalApplication] = await Promise.all([job, user, employee, application]);
        res.status(200).json({
            message: "All documents counted successfully",
            totalJobs,
            totalApplication,
            totalEmployee,
            totalUser
        });
    }
    catch (error) {
        next(error);
    }
};
exports.DashboardCardData = DashboardCardData;

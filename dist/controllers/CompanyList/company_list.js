"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyList = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const CompanyList = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const pipeline = [
            { $group: { _id: "$companyName", logo: { $first: "$companyLogo" }, location: { $first: "$location" } } },
            { $project: { _id: 0, companyName: "$_id", logo: 1, location: 1 } }
        ];
        const companies = await jobModel_1.default.aggregate([...pipeline, { $skip: (page - 1) * limit }, { $limit: limit }]);
        const totalCompanies = await jobModel_1.default.aggregate([...pipeline, { $count: "total" }]);
        const total = totalCompanies[0]?.total || 0;
        res.status(200).send({
            companies,
            total: Math.ceil(total / limit),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.CompanyList = CompanyList;

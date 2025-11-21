"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAcceptsJobs = void 0;
const jobModel_1 = __importDefault(require("../../models/JobModel/jobModel"));
const AdminAcceptsJobs = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { accept, reject } = req.query;
        const updateData = {};
        if (accept === "true") {
            updateData.status = "accepted";
        }
        else if (reject === "true") {
            updateData.status = "rejected";
        }
        if (!updateData.status) {
            return res.status(400).json({ message: "Please provide ?accept=true or ?reject=true" });
        }
        const result = await jobModel_1.default.updateOne({ _id: id }, { $set: updateData });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Application not found or already updated" });
        }
        res.status(200).json({ message: "Application status updated successfully", result });
    }
    catch (error) {
        next(error);
    }
};
exports.AdminAcceptsJobs = AdminAcceptsJobs;

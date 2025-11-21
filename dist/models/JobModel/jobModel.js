"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jobsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    workingHours: { type: String, required: true },
    salaryRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        currency: { type: String, default: "BDT" },
    },
    skills: { type: [String], default: [] },
    postedDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    aboutTheJob: { type: String, required: true },
    jobDescription: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    companyLogo: { type: String, default: "" },
    contactEmail: { type: String, required: true },
    contactMessage: { type: String, default: "" },
    status: { type: String, enum: ["pending", "accept", "reject"], default: "pending" },
}, {
    timestamps: true
});
const JobsModel = (0, mongoose_1.model)('Job', jobsSchema);
exports.default = JobsModel;

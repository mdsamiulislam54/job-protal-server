"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ApplicationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    github: { type: String },
    linkedin: { type: String },
    resume: { type: String, required: true },
    question: { type: String },
    applicationId: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"],
        default: "Pending",
    },
    appliedDate: { type: String, default: new Date().toLocaleDateString() },
}, { timestamps: true });
const ApplicationModel = (0, mongoose_1.model)('application', ApplicationSchema);
exports.default = ApplicationModel;

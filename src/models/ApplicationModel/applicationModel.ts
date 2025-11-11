
import { Schema, model } from "mongoose";
import { ApplicationType } from "../../types/applicationType";


const ApplicationSchema: Schema<ApplicationType> = new Schema(
    {
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
    },
    { timestamps: true }
);

const ApplicationModel = model<ApplicationType>('application', ApplicationSchema)

export default ApplicationModel;

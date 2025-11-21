import { Request, Response, NextFunction } from "express";
import JobsModel from "../../models/JobModel/jobModel";

export const AdminAcceptsJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { accept, reject } = req.query;
        const updateData: any = {};
        if (accept === "true") {
            updateData.status = "accepted";
        } else if (reject === "true") {
            updateData.status = "rejected";
        }

        if (!updateData.status) {
            return res.status(400).json({ message: "Please provide ?accept=true or ?reject=true" });
        }

        const result = await JobsModel.updateOne({ _id: id }, { $set: updateData });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Application not found or already updated" });
        }

        res.status(200).json({ message: "Application status updated successfully", result });
    } catch (error) {
        next(error);
    }
};

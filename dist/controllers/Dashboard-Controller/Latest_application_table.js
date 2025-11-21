"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestApplication = void 0;
const applicationModel_1 = __importDefault(require("../../models/ApplicationModel/applicationModel"));
const LatestApplication = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "all";
        let sortOption = {};
        let filter = {};
        // Determine sort option
        switch (sort) {
            case "all":
                sortOption = {};
                break;
            case "latest":
                sortOption = {
                    createdAt: -1
                };
                break;
            case "older":
                sortOption = {
                    createdAt: 1
                };
                break;
            case "pending":
                filter = { status: "pending" };
                sortOption = { createdAt: -1 };
                break;
            case "accepted":
                filter = { status: "accepted" };
                break;
            default:
                sortOption = {
                    createdAt: -1
                };
        }
        const total = await applicationModel_1.default.countDocuments(filter);
        const application = await applicationModel_1.default.find(filter).sort(sortOption).skip((page - 1) * limit).limit(limit);
        res.setHeader("Cache-Control", "no-store");
        res.status(200).send({
            message: "All Application Find Successfully!",
            totalPage: Math.ceil(total / limit),
            application: application,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.LatestApplication = LatestApplication;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingApplicationList = void 0;
const applicationModel_1 = __importDefault(require("../../models/ApplicationModel/applicationModel"));
const PendingApplicationList = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const pendingApplication = await applicationModel_1.default.find({ status: 'pending' })
            .lean()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await applicationModel_1.default.countDocuments({ status: 'pending' });
        res.status(200).send({
            message: "Pending application find successfully",
            pendingApplication,
            total: Math.ceil(total / limit)
        });
    }
    catch (error) {
        next(error);
    }
};
exports.PendingApplicationList = PendingApplicationList;

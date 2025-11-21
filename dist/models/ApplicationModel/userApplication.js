"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApplicationByEmail = void 0;
const applicationModel_1 = __importDefault(require("./applicationModel"));
const UserApplicationByEmail = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { email } = req.params;
        const application = await applicationModel_1.default.find({ email: email })
            .lean()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await applicationModel_1.default.countDocuments({ email: email });
        res.status(200).send({ message: "User Application Find Successfully!", application, total: Math.ceil(total / limit) });
    }
    catch (error) {
        next(error);
    }
};
exports.UserApplicationByEmail = UserApplicationByEmail;

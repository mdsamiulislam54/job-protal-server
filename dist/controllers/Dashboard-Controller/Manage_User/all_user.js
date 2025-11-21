"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUser = void 0;
const userModel_1 = __importDefault(require("../../../models/UserModel/userModel"));
const GetAllUser = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const user = await userModel_1.default.find().lean().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        const total = await userModel_1.default.countDocuments();
        res.status(200).send({
            message: "All user Find Successfully",
            total: Math.ceil(total / limit),
            user: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.GetAllUser = GetAllUser;

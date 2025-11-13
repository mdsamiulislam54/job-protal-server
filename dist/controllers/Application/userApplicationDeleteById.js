"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApplicationDeleteById = void 0;
const applicationModel_1 = __importDefault(require("../../models/ApplicationModel/applicationModel"));
const UserApplicationDeleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await applicationModel_1.default.deleteOne({ _id: id });
        res.status(200).send({ "message": "Application deleted successfully", result });
    }
    catch (error) {
        next(error);
    }
};
exports.UserApplicationDeleteById = UserApplicationDeleteById;

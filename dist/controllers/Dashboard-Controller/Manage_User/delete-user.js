"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserDelete = void 0;
const userModel_1 = __importDefault(require("../../../models/UserModel/userModel"));
const AdminUserDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userModel_1.default.deleteOne({ _id: id });
        res.status(200).send({
            message: "User delete successfully",
            user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.AdminUserDelete = AdminUserDelete;

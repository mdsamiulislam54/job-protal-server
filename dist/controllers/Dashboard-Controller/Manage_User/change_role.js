"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleChange = void 0;
const userModel_1 = __importDefault(require("../../../models/UserModel/userModel"));
const RoleChange = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        // Logic to change user role in the database goes here
        const user = await userModel_1.default.findByIdAndUpdate(id, { role: role });
        res.status(200).send({
            message: `User role changed to ${role} successfully`
        });
    }
    catch (error) {
        next(error);
    }
};
exports.RoleChange = RoleChange;

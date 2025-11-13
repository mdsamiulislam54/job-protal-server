"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApplicationByEmail = void 0;
const applicationModel_1 = __importDefault(require("./applicationModel"));
const UserApplicationByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const application = await applicationModel_1.default.find({ email: email }).lean().sort({ createdAt: -1 });
        res.status(200).send({ message: "User Application Find Successfully!", application });
    }
    catch (error) {
        next(error);
    }
};
exports.UserApplicationByEmail = UserApplicationByEmail;

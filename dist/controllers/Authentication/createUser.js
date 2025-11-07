"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const userModel_1 = __importDefault(require("../../models/UserModel/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateUser = async (req, res, next) => {
    try {
        const { name, email, password, role, photoUrl } = req.body;
        const existUser = await userModel_1.default.findOne({ email: email });
        if (existUser) {
            return res.status(409).send({ message: "User Already Exists" });
        }
        const hasPassword = await bcrypt_1.default.hash(password, 10);
        const userData = {
            name,
            email,
            password: hasPassword,
            role,
            photoUrl
        };
        const user = await userModel_1.default.create(userData);
        res.status(200).send({ success: true, message: "User create Successful", user });
    }
    catch (error) {
        next(error);
    }
};
exports.CreateUser = CreateUser;

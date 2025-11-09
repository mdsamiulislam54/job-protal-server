"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../../models/UserModel/userModel"));
const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        const authorize = await bcrypt_1.default.compare(password, user?.password);
        if (!authorize) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        const newUser = {
            name: user.name,
            role: user.role,
            photoUrl: user.photoUrl,
            email: user.email,
            id: user._id
        };
        return res.status(200).send({ message: "Login Successfully!", newUser });
    }
    catch (error) {
        next(error);
    }
};
exports.LoginUser = LoginUser;
